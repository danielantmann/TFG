import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function LogInModal({ show, handleLoginModal }) {
    const { setUsuario, setIdUsuario } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRedirect = (role) => {
        if (role === 'admin') {
            navigate('/adminhome');
        } else if (role === 'user') {
            navigate('/userhome');
        } else {
            navigate('/home');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/usuarios');
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            const usuarios = await response.json();
            const user = usuarios.find(
                (u) => u.email === email && u.password === password
            );
            if (user) {
                // Guardamos el role y id en sessionStorage para persistir al recargar
                sessionStorage.setItem('role', user.role);
                sessionStorage.setItem('id', user.id);
                setUsuario(user.role); // Actualiza el estado global
                setIdUsuario(user.id); // Establece el id del usuario
                handleRedirect(user.role); // Redirige a la página correspondiente
                handleLoginModal(); // Cierra el modal
            } else {
                setError('Correo o contraseña incorrectos.');
            }
        } catch (error) {
            setError('Hubo un problema al iniciar sesión. Inténtalo más tarde.');
        }
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Iniciar Sesión</h5>
                        <button type="button" className="btn-close" onClick={handleLoginModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInModal;