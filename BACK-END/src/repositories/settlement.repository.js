const { liquidacionproveedor } = require('../models');
const { sequelize } = require('../config/db')
const { QueryTypes } = require('sequelize');

const getAllSettlement = async () => {
    return await liquidacionproveedor.findAll();
};

const getOneSettlement = async (id) => {
    return await liquidacionproveedor.findByPk(id);
};

const getProductsOfSettlement = async (idProveedor) => {
    const products = await sequelize.query(
        `
        SELECT *
        FROM vista_productos_proveedor
        WHERE idProveedor = :idProveedor;
        `,
        {
            replacements: { idProveedor },
            type: sequelize.QueryTypes.SELECT,
        }
    );
    return products;
};

const createSettlement = async (settlement) => {
    return await liquidacionproveedor.create(settlement);
};

const updateSettlement = async (id, settlement) => {
    return await liquidacionproveedor.update(settlement, { where: { idLiquidacionProveedor: id } });
};

const deleteSettlement = async (id) => {
    return await liquidacionproveedor.destroy({ where: { idLiquidacionProveedor: id } });
};


module.exports = {
    getAllSettlement,
    getOneSettlement,
    getProductsOfSettlement,
    createSettlement,
    updateSettlement,
    deleteSettlement
};