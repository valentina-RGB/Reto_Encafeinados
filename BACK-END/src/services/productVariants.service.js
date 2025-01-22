const variantRepository = require('../repositories/productVariants.repository');

const getAllVariants = async () => {
    return await variantRepository.getAllVariants();
};

const getVariantById = async (id) => {
    return await variantRepository.getVariantById(id);
};

const createVariant = async (variant) => {
    return await variantRepository.createVariant(variant);
};

const updateVariant = async (id, variant) => {
    return await variantRepository.updateVariant(id, variant);
};

const deleteVariant = async (id) => {
    return await variantRepository.deleteVariant(id);
};

module.exports = {
    getAllVariants,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant
};