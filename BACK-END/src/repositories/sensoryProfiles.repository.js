const { perfilsensorial } = require('../models');

const getAllSensoryProfiles = async () => {
    return await perfilsensorial.findAll();
};

const getOneSensoryProfile = async (id) => {
    return await perfilsensorial.findByPk(id);
};

const createSensoryProfile = async (sensoryProfile) => {
    return await perfilsensorial.create(sensoryProfile);
};

const updateSensoryProfile = async (id, sensoryProfile) => {
    return await perfilsensorial.update(sensoryProfile, { where: { idPerfilSensorial : id } });
};

const deleteSensoryProfile = async (id) => {
    return await perfilsensorial.destroy({ where: { idPerfilSensorial : id } });
};

module.exports = {
    getAllSensoryProfiles,
    getOneSensoryProfile,
    createSensoryProfile,
    updateSensoryProfile,
    deleteSensoryProfile
};