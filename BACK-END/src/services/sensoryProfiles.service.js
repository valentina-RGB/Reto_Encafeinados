const sensoryProfileRepository = require('../repositories/sensoryProfiles.repository');

const getAllSensoryProfiles = async () => {
    try {
        return await sensoryProfileRepository.getAllSensoryProfiles();
    } catch (error) {
        throw error;
        
    }
};

const getOneSensoryProfile = async (id) => {
    try {
        return await sensoryProfileRepository.getOneSensoryProfile(id);
    } catch (error) {
        throw error;
        
    }
};

const createSensoryProfile = async (sensoryProfile) => {
    try {
        return await sensoryProfileRepository.createSensoryProfile(sensoryProfile);
    } catch (error) {
        throw error;
        
    }
};

const updateSensoryProfile = async (id, sensoryProfile) => {
    try {
        return await sensoryProfileRepository.updateSensoryProfile(id, sensoryProfile);
    } catch (error) {
        throw error;
        
    }
};

const deleteSensoryProfile = async (id) => {
    try {
        return await sensoryProfileRepository.deleteSensoryProfile(id);
    } catch (error) {
        throw error;
        
    }
};

module.exports = {
    getAllSensoryProfiles,
    getOneSensoryProfile,
    createSensoryProfile,
    updateSensoryProfile,
    deleteSensoryProfile
};