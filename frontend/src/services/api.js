// src/services/api.js
import axios from 'axios';

// Se houver NODE_ENV=production, use a URL de produção, senão localhost
const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://mycar-mvp.onrender.com'
        : 'http://localhost:3000';

const api = axios.create({ baseURL });

// ---------------------
// Rotas de Autenticação
// ---------------------
export const registerUser = async (formData) => {
    const response = await api.post('/api/auth/register', formData);
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/api/auth/forgot', { email });
    return response.data;
};

// ---------------------
// Rotas de Veículos
// ---------------------
export const getVehicles = async () => {
    // Pega o token do localStorage
    const token = localStorage.getItem('token');
    const response = await api.get('/api/vehicles', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const createVehicle = async (vehicleData) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/api/vehicles', vehicleData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export default api;
