// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET_KEY || 'fallback-secret';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token ausente' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId; // injeta o userId do token
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = authMiddleware;
