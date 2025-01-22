var DataTypes = require("sequelize").DataTypes;
var _abonoproveedor = require("./abonoproveedor");
var _consignaciones = require("./consignaciones");
var _detalleconsignacion = require("./detalleconsignacion");
var _detallemovimiento = require("./detallemovimiento");
var _liquidacionproveedor = require("./liquidacionproveedor");
var _movimientos = require("./movimientos");
var _perfilsensorial = require("./perfilsensorial");
var _productos = require("./productos");
var _proveedores = require("./proveedores");
var _roles = require("./roles");
var _tiendas = require("./tiendas");
var _usuarios = require("./usuarios");
var _varianteproducto = require("./varianteproducto");

function initModels(sequelize) {
  var abonoproveedor = _abonoproveedor(sequelize, DataTypes);
  var consignaciones = _consignaciones(sequelize, DataTypes);
  var detalleconsignacion = _detalleconsignacion(sequelize, DataTypes);
  var detallemovimiento = _detallemovimiento(sequelize, DataTypes);
  var liquidacionproveedor = _liquidacionproveedor(sequelize, DataTypes);
  var movimientos = _movimientos(sequelize, DataTypes);
  var perfilsensorial = _perfilsensorial(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tiendas = _tiendas(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var varianteproducto = _varianteproducto(sequelize, DataTypes);

  detalleconsignacion.belongsTo(consignaciones, { as: "idConsignacion_consignacione", foreignKey: "idConsignacion"});
  consignaciones.hasMany(detalleconsignacion, { as: "detalleconsignacions", foreignKey: "idConsignacion"});
  liquidacionproveedor.belongsTo(consignaciones, { as: "idConsignacion_consignacione", foreignKey: "idConsignacion"});
  consignaciones.hasMany(liquidacionproveedor, { as: "liquidacionproveedors", foreignKey: "idConsignacion"});
  detallemovimiento.belongsTo(detalleconsignacion, { as: "idDetalleConsignacion_detalleconsignacion", foreignKey: "idDetalleConsignacion"});
  detalleconsignacion.hasMany(detallemovimiento, { as: "detallemovimientos", foreignKey: "idDetalleConsignacion"});
  abonoproveedor.belongsTo(liquidacionproveedor, { as: "idLiquidacionProveedor_liquidacionproveedor", foreignKey: "idLiquidacionProveedor"});
  liquidacionproveedor.hasMany(abonoproveedor, { as: "abonoproveedors", foreignKey: "idLiquidacionProveedor"});
  detallemovimiento.belongsTo(movimientos, { as: "idMovimiento_movimiento", foreignKey: "idMovimiento"});
  movimientos.hasMany(detallemovimiento, { as: "detallemovimientos", foreignKey: "idMovimiento"});
  perfilsensorial.belongsTo(productos, { as: "idProducto_producto", foreignKey: "idProducto"});
  productos.hasMany(perfilsensorial, { as: "perfilsensorials", foreignKey: "idProducto"});
  varianteproducto.belongsTo(productos, { as: "idProducto_producto", foreignKey: "idProducto"});
  productos.hasMany(varianteproducto, { as: "varianteproductos", foreignKey: "idProducto"});
  consignaciones.belongsTo(proveedores, { as: "idProveedor_proveedore", foreignKey: "idProveedor"});
  proveedores.hasMany(consignaciones, { as: "consignaciones", foreignKey: "idProveedor"});
  usuarios.belongsTo(roles, { as: "idRol_role", foreignKey: "idRol"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "idRol"});
  proveedores.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasOne(proveedores, { as: "proveedore", foreignKey: "idUsuario"});
  tiendas.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasOne(tiendas, { as: "tienda", foreignKey: "idUsuario"});
  detalleconsignacion.belongsTo(varianteproducto, { as: "idVarianteProducto_varianteproducto", foreignKey: "idVarianteProducto"});
  varianteproducto.hasMany(detalleconsignacion, { as: "detalleconsignacions", foreignKey: "idVarianteProducto"});

  return {
    abonoproveedor,
    consignaciones,
    detalleconsignacion,
    detallemovimiento,
    liquidacionproveedor,
    movimientos,
    perfilsensorial,
    productos,
    proveedores,
    roles,
    tiendas,
    usuarios,
    varianteproducto,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
