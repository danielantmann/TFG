import React, { useRef ,useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha"; // Importa el componente de reCAPTCHA

function RegisterModal({ show, handleRegisterModal, toggleToLogin }) {
    const { setUsuario, setIdUsuario } = useContext(UserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [captchaValido, setCaptchaValido] = useState(false);
    const navigate = useNavigate();
    const captcha = useRef(null);
    const onChange = () => {
        if(captcha.current.getValue()){
            setCaptchaValido(true);            
        };
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!captchaValido) {
            setError('Por favor, marque la casilla del Captcha.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/usuarios');
            if (!response.ok) throw new Error('Error en la petición');

            const usuarios = await response.json();
            if (usuarios.some(u => u.email === email)) {
                setError('El correo ya está registrado.');
                return;
            }

            const nuevoUsuario = { email, password, role: 'user', name };

            await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuario),
            });

            sessionStorage.setItem('role', 'user');
            sessionStorage.setItem('id', nuevoUsuario.id);
            setUsuario('user');
            setIdUsuario(nuevoUsuario.id);
            navigate('/userhome');
            handleRegisterModal();
        } catch {
            setError('Hubo un problema al registrarse. Inténtalo más tarde.');
        }
    };
    
    return (
        <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registro</h5>
                        <button type="button" className="btn-close" onClick={handleRegisterModal}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Nombre Completo:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Repetir Contraseña:</label>
                                <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>

                            <div className="mb-3">
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey="6LcTdQkrAAAAAHLKpuy33QouE9JZ57xmfA1JoRhs"
                                    onChange={onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Registrarse</button>
                            {error && <p className="text-danger m-2">{error}</p>}
                            </form>
                        <div className="text-center mt-3">
                            <p>¿Ya tienes una cuenta?
                                <button className="btn btn-link" onClick={() => {
                                    handleRegisterModal(); // Cierra el modal de registro
                                    toggleToLogin(); // Abre el modal de inicio de sesión
                                }}>Inicia sesión aquí</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;