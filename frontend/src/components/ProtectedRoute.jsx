// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredType }) {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    // Se não estiver logado, redireciona para /login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Se estiver logado, mas o userType não bater com o requiredType, bloqueia
    if (requiredType && userType !== requiredType) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
