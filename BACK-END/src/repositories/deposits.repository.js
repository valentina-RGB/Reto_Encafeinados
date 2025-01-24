const { abonoproveedor } = require('../models');
const { sequelize } = require('../config/db')
const { QueryTypes } = require('sequelize');

const getAllDeposit = async () => {
    return await abonoproveedor.findAll();
};

const getAllDepositBySupplier = async () => {

        const totalDeposits = await sequelize.query(
            `
            SELECT 
                p.idProveedor,
                p.nombreProveedor,
                SUM(a.monto) AS abonos
            FROM 
                proveedores p
            JOIN 
                liquidacionProveedor l ON p.idProveedor = l.idProveedor
            LEFT JOIN 
                abonoProveedor a ON l.idLiquidacion = a.idLiquidacionProveedor
            GROUP BY 
                p.idProveedor, p.nombreProveedor;
            `,
            { type: QueryTypes.SELECT }
        );
        return totalDeposits;
    };
    

const createDeposit = async (deposit) => {
    return await abonoproveedor.create(deposit);
};

const updateDeposit = async (id, deposit) => {
    return await abonoproveedor.update(deposit, {
        where: { id }
    });
};

const deleteDeposit = async (id) => {
    return await abonoproveedor.destroy({
        where: { id }
    });
};

module.exports = {
    getAllDeposit,
    getAllDepositBySupplier,
    createDeposit,
    updateDeposit,
    deleteDeposit
};
