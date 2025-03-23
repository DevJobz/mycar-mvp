import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const navigate = useNavigate();

  // Imagens que trocam a cada 4s
  const images = [
    '/ilustracao-login.png',
    '/ilustracao-login-2.png',
    '/ilustracao-login-3.png',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Regex básico p/ e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailFormatValid = email.length === 0 || emailRegex.test(email);

  // Erros locais
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Shake
  const [shakeEmail, setShakeEmail] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  // Borda verde
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Alerta (fora do container do form, no canto da tela)
  const [alertData, setAlertData] = useState({
    show: false,
    type: 'error', // 'error' | 'success'
    message: '',
    progress: 100, // 0-100
  });
  // Controla fade out
  const [fadeOut, setFadeOut] = useState(false);

  // Decrementa progress => ao chegar em 0 => fade out
  useEffect(() => {
    let timer;
    if (alertData.show && !fadeOut) {
      timer = setInterval(() => {
        setAlertData((prev) => {
          if (prev.progress <= 0) {
            return { ...prev, progress: 0 };
          }
          return { ...prev, progress: prev.progress - 1.6667 };
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [alertData.show, fadeOut]);

  // Quando progress == 0 => inicia fadeOut => após 500ms => remove alert
  useEffect(() => {
    if (alertData.progress === 0 && alertData.show && !fadeOut) {
      setFadeOut(true);
      const timeout = setTimeout(() => {
        setAlertData({ ...alertData, show: false, progress: 100 });
        setFadeOut(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [alertData, fadeOut]);

  const handleEmailBlur = () => {
    if (email.length > 0 && !isEmailFormatValid) {
      setEmailError('Formato de e-mail inválido');
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset
    setEmailError('');
    setPasswordError('');

    let hasError = false;

    // Verifica e-mail
    if (!email.trim()) {
      setEmailError('Por favor, insira seu e-mail.');
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      hasError = true;
    } else if (!isEmailFormatValid) {
      setEmailError('Formato de e-mail inválido');
      setShakeEmail(true);
      setTimeout(() => setShakeEmail(false), 400);
      hasError = true;
    }

    // Verifica senha
    if (!password.trim()) {
      setPasswordError('Por favor, insira sua senha.');
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 400);
      hasError = true;
    }

    if (hasError) return;

    try {
      const data = await loginUser(email, password);
      console.log('Login bem-sucedido:', data);

      setEmailSuccess(true);
      setPasswordSuccess(true);

      // Alerta de sucesso
      setAlertData({
        show: true,
        type: 'success',
        message: 'Login realizado com sucesso!',
        progress: 100,
      });
      setFadeOut(false);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userType', data.userType);

      // Redireciona após ~3s
      setTimeout(() => {
        if (data.userType === 'user') {
          navigate('/dashboard/user');
        } else if (data.userType === 'company') {
          navigate('/dashboard/company');
        } else {
          navigate('/dashboard/provider');
        }
      }, 3000);

    } catch (error) {
      console.error('Erro no login:', error);

      let errorMsg = 'Erro no login.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      }

      let isEmailNotFound = false;
      let isWrongPassword = false;

      if (errorMsg.toLowerCase().includes('não encontrado')) {
        isEmailNotFound = true;
      } else if (errorMsg.toLowerCase().includes('senha incorreta')) {
        isWrongPassword = true;
      }

      if (isEmailNotFound) {
        setAlertData({
          show: true,
          type: 'error',
          message: 'Usuário não encontrado :C',
          progress: 100,
        });
        setFadeOut(false);
        setShakeEmail(true);
        setTimeout(() => setShakeEmail(false), 400);
      } else if (isWrongPassword) {
        setAlertData({
          show: true,
          type: 'error',
          message: 'Senha incorreta :C',
          progress: 100,
        });
        setFadeOut(false);
        setShakePassword(true);
        setTimeout(() => setShakePassword(false), 400);
      } else {
        setAlertData({
          show: true,
          type: 'error',
          message: errorMsg,
          progress: 100,
        });
        setFadeOut(false);
      }
    }
  };

  // Classes do e-mail
  const emailInputClass = [
    'border', 'rounded', 'w-full', 'p-2', 'mb-1',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-[#2634b2]',
  ];
  if (shakeEmail) emailInputClass.push('shake');
  if (emailError) emailInputClass.push('border-red-500');
  else if (emailSuccess) emailInputClass.push('border-green-500');

  // Classes da senha
  const passwordInputClass = [
    'border', 'rounded', 'w-full', 'p-2', 'mb-1',
    'focus:outline-none', 'focus:ring-2', 'focus:ring-[#2634b2]',
  ];
  if (shakePassword) passwordInputClass.push('shake');
  if (passwordError) passwordInputClass.push('border-red-500');
  else if (passwordSuccess) passwordInputClass.push('border-green-500');

  return (
    <div className="min-h-screen bg-gradient-to-tr from-sky-200 via-sky-300 to-blue-500 flex items-center justify-center p-4 relative">
      
      {/* ALERT FORA do container do formulário (canto sup. direito da tela) */}
      {alertData.show && (
        <div
          className={`
            absolute top-2 sm:top-4 right-2 sm:right-4 z-50
            px-4 py-2 rounded shadow-lg flex flex-col
            transition-all duration-500
            ${fadeOut ? 'opacity-0' : 'opacity-100'}
            ${
              alertData.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-green-500 text-white'
            }
          `}
          style={{ width: 'fit-content', maxWidth: '90%' }}
        >
          <div className="font-bold mb-1 text-sm sm:text-base whitespace-nowrap">
            {alertData.message}
          </div>
          <div className="h-1 bg-white w-full">
            <div
              className="h-1 bg-black transition-all duration-50"
              style={{ width: `${alertData.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Container principal */}
      <div className="bg-white shadow-2xl rounded-md overflow-hidden w-full max-w-5xl md:flex">
        
        {/* Lado esquerdo (imagem) */}
        <div className="relative md:w-1/2 hidden md:block">
          <img
            src={process.env.PUBLIC_URL + images[currentImageIndex]}
            alt="Ilustração Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lado direito (formulário) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="mb-6">
            <img
              src={process.env.PUBLIC_URL + '/logo-principal.png'}
              alt="Logo Principal"
              className="w-48 h-auto float-animation"
            />
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col w-full md:w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#17259f]">
              Bem-vindo de volta :D
            </h2>

            {/* E-mail */}
            <label className="block mb-1 text-gray-700" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="text"
              placeholder="seuemail@exemplo.com"
              className={emailInputClass.join(' ')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailSuccess(false);
              }}
              onBlur={handleEmailBlur}
            />
            {emailError && (
              <div className="text-red-500 text-sm mb-2">{emailError}</div>
            )}

            {/* Senha */}
            <label className="block mb-1 text-gray-700" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              className={passwordInputClass.join(' ')}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordSuccess(false);
              }}
            />
            {passwordError && (
              <div className="text-red-500 text-sm mb-2">{passwordError}</div>
            )}

            {/* Lembrar-me e Esqueci a senha */}
            <div className="flex items-center justify-between mb-4 mt-2">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2" />
                Lembrar-me
              </label>
              <a href="#/forgot" className="text-sm text-[#17259f] hover:underline">
                Esqueci minha senha
              </a>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              className="bg-[#17259f] hover:bg-[#2634b2] text-white w-full py-2 rounded mb-4 transition-colors"
            >
              Entrar
            </button>

            {/* Entrar com Google */}
            <button
              type="button"
              className="border border-gray-300 w-full py-2 rounded flex items-center justify-center hover:bg-gray-100"
            >
              <img
                src={process.env.PUBLIC_URL + '/google-icon.png'}
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Entrar com Google
            </button>

            {/* Link de registro */}
            <div className="text-sm text-center mt-4">
              <span>Não tem conta?</span>{' '}
              <a href="#/register" className="text-[#17259f] hover:underline">
                Cadastre-se
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
