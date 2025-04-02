import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = sessionStorage.getItem('role');
    if (savedRole) {
      setUsuario(savedRole);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('role');
    setUsuario('');
    navigate('/home', { replace: true });
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, loading, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
