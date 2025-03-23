// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicle');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro na conexão com o MongoDB:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Endpoint de teste
app.get('/', (req, res) => {
    res.send('API do MyCar MVP está funcionando!');
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
