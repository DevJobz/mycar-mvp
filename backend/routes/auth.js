// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.SECRET_KEY || 'fallback-secret';

// Rota de Registro
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;

        // Verifica se o e-mail já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Agora retornamos { message: 'E-mail já cadastrado' }
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            userType,
        });

        // Retorna dados básicos
        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.userType,
        });
    } catch (error) {
        console.error('Erro no registro:', error);
        // Agora retornamos { message: 'Erro no servidor' }
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica usuário pelo email
        const user = await User.findOne({ email });
        if (!user) {
            // Usamos { message: 'Usuário não encontrado' }
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Compara senhas
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            // Usamos { message: 'Senha incorreta' }
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gera token JWT
        const token = jwt.sign(
            { userId: user._id, userType: user.userType },
            SECRET,
            { expiresIn: '1d' }
        );

        // Retorna userType e token
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            token,
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota de "Esqueci minha senha"
router.post('/forgot', async (req, res) => {
    try {
        const { email } = req.body;
        // Verifica se o usuário existe
        // (Para MVP, apenas retornamos mensagem genérica)
        const user = await User.findOne({ email });
        return res.json({
            message: 'Se o e-mail existir no sistema, enviaremos instruções de redefinição.',
        });
    } catch (error) {
        console.error('Erro no forgot:', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

// Rota para listar usuários (opcional)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
