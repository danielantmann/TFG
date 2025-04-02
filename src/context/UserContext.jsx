import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [usuario, setUsuario] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Recupera los datos del usuario desde sessionStorage
        const savedRole = sessionStorage.getItem('role');
        const savedIdUsuario = sessionStorage.getItem('id');
        
        if (savedRole) {
            setUsuario(savedRole); // Establece el rol del usuario
        }
        
        if (savedIdUsuario) {
            setIdUsuario(savedIdUsuario); // Establece el id del usuario
        }
        
        setLoading(false); // Termina la carga
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('primeraCita');
        setUsuario('');
        setIdUsuario('');
        navigate('/home');
    };

    return (
        <UserContext.Provider value={{ usuario, setUsuario, loading, handleLogout, idUsuario, setIdUsuario }}>
            {children}
        </UserContext.Provider>
    );
};

