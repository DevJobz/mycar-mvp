import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Mostra a tela por 2 segundos, depois inicia a transição de fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Após mais 1 segundo, navega para a tela de login
    const timer2 = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-white transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Exibe a imagem do logo em vez do texto */}
      <img
        src={process.env.PUBLIC_URL + "/logo-principal.png"}
        alt="Logo Principal"
        style={{ width: '250px', height: 'auto' }}
      />
    </div>
  );
}

export default SplashScreen;
