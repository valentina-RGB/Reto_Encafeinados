const { liquidacionproveedor } = require('../models');

const getAllSettlement = async () => {
    return await liquidacionproveedor.findAll();
};

const getOneSettlement = async (id) => {
    return await liquidacionproveedor.findByPk(id);

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
    createSettlement,
    updateSettlement,
    deleteSettlement
};