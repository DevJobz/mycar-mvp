// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await forgotPassword(email);
            // data.message -> "Se o e-mail existir no sistema, enviaremos instruções..."
            setMessage(data.message);

            // Redireciona para /login após 3 segundos
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error);
            setMessage('Ocorreu um erro ao processar sua solicitação.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    Esqueci minha senha
                </h2>

                {message && (
                    <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">
                        {message}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Digite seu e-mail"
                    className="border p-2 w-full mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                >
                    Enviar
                </button>

                <div className="text-sm text-center mt-2">
                    <a href="#/login" className="text-blue-500 hover:underline">
                        Voltar ao Login
                    </a>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
