// src/pages/DashboardUser.jsx
import React from 'react';

function DashboardUser() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">
                Bem-vindo ao Dashboard do Usuário!
            </h1>
            <p>Aqui você pode ver suas informações, manutenções, etc.</p>
            <a
                href="#/vehicles"
                className="text-blue-500 hover:underline mt-2 inline-block"
            >
                Ver Veículos
            </a>
        </div>
    );
}

export default DashboardUser;
