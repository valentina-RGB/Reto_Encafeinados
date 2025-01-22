const { Op } = require('sequelize');
// const { Sequelize, DataTypes } = require('sequelize');


const { DetalleConsignacion, DetalleMovimiento, AbonoProveedor } = require('../models');


 const getMovimiento = () =>{
  const response = DetalleMovimiento.findByPk(detailMovement.idDetalleMovimiento);
  console.log('RESPUESTA:', response);
};
// 1. Calcular total del detalle del movimientoo
const calculateMovementTotalAndPrices = async (detailMovement, options) => {
    if (!detailMovement.changed()) return;

    console.log('ARROJAR:', detailMovement);
    
    
  
    const movement = await detailMovement.getMovimiento();
    const movementType = movement.tipoMovimiento;
    
    if (movementType === 'Venta' || movementType === 'Ajuste') {
      const consignmentDetail = await detailMovement.getDetalleConsignacion();
      
      // Establecer precio de compra
      detailMovement.precioCompra = consignmentDetail.precioCompra;
      
      // Establecer precio de venta según el tipo de movimiento
      if (movementType === 'Ajuste') {
        detailMovement.precioVenta = consignmentDetail.precioCompra;  // Para ajustes, usar precio de compra
        detailMovement.total = detailMovement.cantidad * consignmentDetail.precioCompra;
      } else {  // Para ventas
        detailMovement.precioVenta = consignmentDetail.precioVenta;
        detailMovement.total = detailMovement.cantidad * consignmentDetail.precioVenta;
      }
    } else {
      // Para devoluciones u otros tipos
      detailMovement.precioCompra = null;
      detailMovement.precioVenta = null;
      detailMovement.total = null;
    }

    console.log('Hook beforeCreate ejecutado para DetalleMovimiento');
  };  

// 2. Validar fecha de tostión
const validateRoastingDate = async (consignmentDetail, options) => {
  if (!consignmentDetail.fechaTostion) return;

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  if (new Date(consignmentDetail.fechaTostion) < threeMonthsAgo) {
    throw new Error('El café no cumple con los parámetros de frescura. La fecha de tostión es superior a 3 meses.');
  }

  console.log('Hook beforeCreate ejecutado para fecha de totión');
};

// 3. Actualizar cantidades vendidas/devueltas
const updateConsignmentQuantities = async (detailMovement, options) => {
  const movement = await detailMovement.getMovimiento();
  const consignmentDetail = await detailMovement.getDetalleConsignacion();
  const movementType = movement.tipoMovimiento;

  if (movementType === 'Venta' || movementType === 'Ajuste') {
    await consignmentDetail.increment('cantidadVendida', { by: detailMovement.cantidad, transaction: options.transaction });
  } else if (movementType === 'Devolución') {
    await consignmentDetail.increment('cantidadDevuelta', { by: detailMovement.cantidad, transaction: options.transaction });
  }

  console.log('Hook beforeCreate ejecutado para cantidades vendidas/devueltas');
};

// 4. Validar cantidad disponible
const validateAvailableQuantity = async (detailMovement, options) => {
  const movement = await detailMovement.getMovimiento();
  const movementType = movement.tipoMovimiento;

  if (movementType === 'Venta' || movementType === 'Ajuste') {
    const consignmentDetail = await detailMovement.getDetalleConsignacion();
    const availableQuantity = consignmentDetail.cantidadRecibida -
      consignmentDetail.cantidadVendida -
      consignmentDetail.cantidadDevuelta;

    if (detailMovement.cantidad > availableQuantity) {
      throw new Error('Sin existencias disponibles');
    }
  }
  console.log('Hook beforeCreate ejecutado para cantidades disponible');
};

// 5. Actualizar estado de liquidación del proveedor
const updateLiquidationStatus = async (payment, options) => {
  const liquidation = await payment.getLiquidacionProveedor();
  const consignment = await liquidation.getConsignacion();

  // Calcular total a pagar
  const consignmentDetails = await consignment.getDetalleConsignacions();
  const totalToPay = consignmentDetails.reduce((sum, detail) =>
    sum + (detail.cantidadVendida * detail.precioCompra), 0);

  // Calcular total pagado
  const payments = await liquidation.getAbonoProveedors();
  const totalPaid = payments.reduce((sum, payment) => sum + payment.monto, 0);

  // Actualizar estado
  if (totalToPay - totalPaid === 0) {
    await liquidation.update({ estadoLiquidacion: 'PAGADA' });
  } else if (totalPaid > 0) {
    await liquidation.update({ estadoLiquidacion: 'PENDIENTE' });
  }
};

// 6. Validar porcentaje de ganancia y precios
const validatePricesAndPercentages = async (consignmentDetail, options) => {
  if (consignmentDetail.porcentajeGanancia < 0 || consignmentDetail.porcentajeGanancia > 100) {
    throw new Error('El porcentaje de ganancia debe estar entre 0 y 100');
  }

  if (consignmentDetail.precioCompra <= 0) {
    throw new Error('El precio de compra debe ser mayor que 0');
  }

  console.log('Hook beforeCreate ejecutado para porcentaje de ganancia y precios');
};

// 7. Validar cantidad devuelta
const validateReturnedQuantity = async (consignmentDetail, options) => {
  if (consignmentDetail.cantidadDevuelta >
    (consignmentDetail.cantidadRecibida - consignmentDetail.cantidadVendida)) {
    throw new Error('La cantidad devuelta no puede ser mayor que la cantidad disponible');
  }

  console.log('Hook beforeCreate ejecutado para canridad devuelta');
};



// Aplicar los hooks a los modelos
module.exports = (sequelize) => {


  console.log('Holaaa',sequelize.detalleconsignacion, sequelize.detallemovimiento, sequelize.abonoproveedor);

  //  Verificar que los modelos existan antes de usarlos
   if (!sequelize.detallemovimiento || 
    !sequelize.detalleconsignacion || 
    !sequelize.abonoproveedor) {
  console.error('No se encontraron todos los modelos necesarios');
  return;
  }

  sequelize.detallemovimiento.create({
    idMovimiento:1, 
    idDetalleConsignacion:1,
    cantidad:4});
  

  // Hooks para DetalleMovimiento
  sequelize.detallemovimiento.beforeCreate(calculateMovementTotalAndPrices);
  sequelize.detallemovimiento.beforeCreate(validateAvailableQuantity);
  sequelize.detallemovimiento.afterCreate(updateConsignmentQuantities);

  sequelize.detallemovimiento.beforeUpdate(calculateMovementTotalAndPrices);
  sequelize.detallemovimiento.beforeUpdate(validateAvailableQuantity);
  sequelize.detallemovimiento.afterUpdate(updateConsignmentQuantities);

  // Hooks para DetalleConsignacion
  sequelize.detalleconsignacion.beforeCreate(validateRoastingDate);
  sequelize.detalleconsignacion.beforeCreate(validatePricesAndPercentages);
  sequelize.detalleconsignacion.beforeUpdate(validateReturnedQuantity);

  // Hooks para AbonoProveedor
  sequelize.abonoproveedor.afterCreate(updateLiquidationStatus);
  sequelize.abonoproveedor.afterUpdate(updateLiquidationStatus);
};