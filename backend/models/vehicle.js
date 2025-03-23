// models/vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    plate: { type: String, required: true },
    usageProfile: {
        type: String,
        enum: ['urban', 'rodoviario', 'misto'],
        required: true,
    },
    // Campo que relaciona o veículo ao usuário que o criou
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // refere-se ao modelo "User"
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
