import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Home from './pages/Home.jsx';
import BuscadorFichas from './pages/BuscadorFichas.jsx';
import { UserContext } from './context/UserContext.jsx';
import HomeAdmin from './pages/HomeAdmin.jsx';
import FormAltaAdmin from './pages/FormAltaAdmin.jsx';
import CitasAdmin from './pages/CitasAdmin.jsx';

function App() {
  const { usuario } = useContext(UserContext); // Usa el usuario del contexto

  useEffect(() => {
    console.log('Rol restaurado desde contexto:', usuario); // Debug para verificar el contexto
  }, [usuario]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/buscar" element={usuario === 'admin' ? <BuscadorFichas /> : <Home />} />
      <Route path="/adminhome" element={usuario === 'admin' ? <HomeAdmin/> : <Home />} />
      <Route path="/adminalta" element={usuario === 'admin' ? <FormAltaAdmin/> : <Home />} />
      <Route path="/admincitas" element={usuario === 'admin' ? <CitasAdmin/> : <Home />} />
    </Routes>
  );
}

export default App;
