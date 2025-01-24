const supplierRepository = require('../repositories/suppliers.repository');
const userService = require('./users.service');

const gerAllSuppliers = async () => {
    try {
        return await supplierRepository.getAllSupliers();
    } catch (error) {
        throw error;
    }
};

const getOneSupplier = async (id) => {
    try {
        return await supplierRepository.getOneSupplier(id);
    } catch (error) {
        throw error;
    }
};

const createSupplier = async (supplier) => {
    try {

        const emailSupplier = supplier.correoProveedor;
        const password = await userService.createPassword(supplier.nombreProveedor);
        
        const user = await userService.createUser({ idRol: 2, correoUsuario: emailSupplier, claveUsuario: password });

        supplierFinal = {
            ...supplier,
            idUsuario: user.idUsuario,
        }

        const response = await supplierRepository.createSupplier(supplierFinal);

        console.log('proveedor'+ response);
        
        if (!response) return ('No se pudo registrar el proveedor');

        await userService.sendEmail(emailSupplier, password);
        
        return (user,response);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    gerAllSuppliers,
    getOneSupplier,
    createSupplier
};