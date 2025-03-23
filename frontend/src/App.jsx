// src/App.jsx
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas comuns
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';

// Dashboards
import DashboardUser from './pages/DashboardUser';
import DashboardCompany from './pages/DashboardCompany';
import DashboardProvider from './pages/DashboardProvider';

// Rota protegida (opcional, se você quer bloquear acesso sem login)
import ProtectedRoute from './components/ProtectedRoute';

// Página de "Esqueci Minha Senha"
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    // Substituímos BrowserRouter por HashRouter e removemos basename
    <Router>
      <Routes>
        {/* Splash */}
        <Route path="/" element={<SplashScreen />} />

        {/* Login e Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Página Home (genérica) */}
        <Route path="/home" element={<Home />} />

        {/* Página de veículos */}
        <Route path="/vehicles" element={<Vehicles />} />

        {/* Página de "Esqueci Minha Senha" */}
        <Route path="/forgot" element={<ForgotPassword />} />

        {/* Dashboards (restritos por tipo de usuário) */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute requiredType="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/company"
          element={
            <ProtectedRoute requiredType="company">
              <DashboardCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/provider"
          element={
            <ProtectedRoute requiredType="provider">
              <DashboardProvider />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
