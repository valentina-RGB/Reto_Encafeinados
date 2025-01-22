const sensoryProfileService = require('../services/sensoryProfiles.service');

const getAllSensoryProfiles = async (req, res) => {
    try {
        const sensoryProfiles = await sensoryProfileService.getAllSensoryProfiles();
        res.status(200).json(sensoryProfiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneSensoryProfile = async (req, res) => {
    try {
        const sensoryProfile = await sensoryProfileService.getOneSensoryProfile(req.params.id);
        res.status(200).json(sensoryProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensoryProfile = async (req, res) => {
    try {
        const sensoryProfile = await sensoryProfileService.createSensoryProfile(req.body);
        res.status(201).json(sensoryProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSensoryProfile = async (req, res) => {
    try {
        const sensoryProfile = await sensoryProfileService.updateSensoryProfile(req.params.id, req.body);
        res.status(200).json(sensoryProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSensoryProfile = async (req, res) => {
    try {
        await sensoryProfileService.deleteSensoryProfile(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSensoryProfiles,
    getOneSensoryProfile,
    createSensoryProfile,
    updateSensoryProfile,
    deleteSensoryProfile
};