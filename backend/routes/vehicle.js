// routes/vehicle.js
const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/vehicles (filtra pelo userId do token)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const vehicles = await Vehicle.find({ owner: req.userId });
        res.json(vehicles);
    } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

// POST /api/vehicles (associa owner ao userId do token)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { brand, model, year, plate, usageProfile } = req.body;
        const newVehicle = await Vehicle.create({
            brand,
            model,
            year,
            plate,
            usageProfile,
            owner: req.userId,
        });
        res.status(201).json(newVehicle);
    } catch (error) {
        console.error('Erro ao criar veículo:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
