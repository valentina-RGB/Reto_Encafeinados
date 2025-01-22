const { varianteproducto } = require('../models');

const getAllVariants = async () => {
    return await varianteproducto.findAll();
};

const getVariantById = async (id) => {
    return await varianteproducto.findByPk(id);
};

const createVariant = async (variantData) => {
    return await varianteproducto.create(variantData);
};

const updateVariant = async (id, variantData) => {
    return await varianteproducto.update(variantData, { where: { idVariante: id } });
};

const deleteVariant = async (id) => {
    return await varianteproducto.destroy({ where: { idVariante: id } });
};

module.exports = {
    getAllVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant
};