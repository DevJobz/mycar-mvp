// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'user',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            // data terá userType e etc.
            console.log('Registro bem-sucedido:', data);
            navigate('/login'); // Redireciona para login ou direto para dashboard
        } catch (error) {
            console.error('Erro no registro:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md"
            >
                <h2 className="text-xl font-bold mb-4">Cadastro</h2>

                <input
                    type="text"
                    placeholder="Nome"
                    className="border p-2 w-full mb-2"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    className="border p-2 w-full mb-2"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="border p-2 w-full mb-2"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />

                <select
                    className="border p-2 w-full mb-2"
                    value={formData.userType}
                    onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                    }
                >
                    <option value="user">Pessoa Física</option>
                    <option value="company">Empresa</option>
                    <option value="provider">Prestador de Serviço</option>
                </select>

                <button className="bg-blue-500 text-white w-full py-2">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default Register;
