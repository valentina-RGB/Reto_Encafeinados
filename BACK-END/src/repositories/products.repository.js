const { productos } = require('../models');

const getAllProducts = async () => {
    return await productos.findAll();
};

const getAllProductsAvailable = async () => {
    return this.sequelize.query(`
        SELECT DISTINCT 
          p.idProducto,
          p.nombreProducto,
          p.categoria,
          p.origen,
          vp.idVariante,
          vp.gramaje,
          SUM(dc.cantidadRecibida - dc.cantidadVendida - dc.cantidadDevuelta) as stockDisponible
        FROM productos p
        JOIN varianteProducto vp ON p.idProducto = vp.idProducto
        JOIN detalleConsignacion dc ON vp.idVariante = dc.idVarianteProducto
        WHERE (dc.cantidadRecibida - dc.cantidadVendida - dc.cantidadDevuelta) > 0
        GROUP BY 
          p.idProducto, 
          p.nombreProducto, 
          p.categoria, 
          p.origen, 
          vp.idVariante, 
          vp.gramaje
        ORDER BY p.nombreProducto, vp.gramaje
      `, { type: QueryTypes.SELECT });
};

const createProduct = async (product) => {
    return await productos.create(product);
};

const deleteProduct = async (id) => {
    return await productos.destroy({
        where: {
            idProducto: id
        }
    });
};

module.exports = {
    getAllProducts,
    getAllProductsAvailable,
    createProduct,
    deleteProduct
};