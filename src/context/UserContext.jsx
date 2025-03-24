import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    const savedRole = sessionStorage.getItem('role');
    if (savedRole) {
      setUsuario(savedRole);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('role');
    setUsuario('');
    Navigate('/home');
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
