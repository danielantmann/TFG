import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Home from './pages/Home.jsx';
import BuscadorFichas from './pages/BuscadorFichas.jsx';
import { UserContext } from './context/UserContext.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import FormAltaAdmin from './pages/FormAltaAdmin.jsx';
import CitasAdmin from './pages/CitasAdmin.jsx';

function App() {
  const { usuario, loading } = useContext(UserContext); // Usa el usuario y loading del contexto

  useEffect(() => {
    console.log('Rol restaurado desde contexto:', usuario);
  }, [usuario]);

  // Mientras se carga (restaura) el rol, mostramos un estado de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route 
        path="/buscar" 
        element={usuario === 'admin' ? <BuscadorFichas /> : <Navigate to="/home" replace />} 
      />
      <Route 
        path="/adminhome" 
        element={usuario === 'admin' ? <HomeAdmin /> : <Navigate to="/home" replace />} 
      />
      <Route 
        path="/adminalta" 
        element={usuario === 'admin' ? <FormAltaAdmin /> : <Navigate to="/home" replace />} 
      />
      <Route 
        path="/admincitas" 
        element={usuario === 'admin' ? <CitasAdmin /> : <Navigate to="/home" replace />} 
      />
    </Routes>
  );
}

export default App;
