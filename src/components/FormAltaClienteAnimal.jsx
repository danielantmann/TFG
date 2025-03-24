import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FormAltaClienteAnimal() {
    const [perroData, setPerroData] = useState({
        nombre: '',
        raza: '',
        edad: '',
        dueño: '',
        observaciones: '',
    });

    // Estado para los datos del usuario
    const [usuarioData, setUsuarioData] = useState({
        email: '',
        password: '',
        role: 'user', // Predeterminado como "user", puedes cambiarlo según sea necesario
        name: '',
    });

    const navigate = useNavigate();

    // Manejar cambios en los datos del perro
    const handlePerroChange = (e) => {
        const { name, value } = e.target;
        setPerroData({ ...perroData, [name]: value });
    };

    // Manejar cambios en los datos del usuario
    const handleUsuarioChange = (e) => {
        const { name, value } = e.target;
        setUsuarioData({ ...usuarioData, [name]: value });
    };

    // Manejar el envío del formulario para ambas tablas
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar datos del perro
            const perroResponse = await fetch('http://localhost:3000/perros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(perroData),
            });

            if (!perroResponse.ok) {
                throw new Error('Error al registrar el perro.');
            }

            console.log('Perro registrado:', perroData);

            // Enviar datos del usuario
            const usuarioResponse = await fetch('http://localhost:3001/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioData),
            });

            if (!usuarioResponse.ok) {
                throw new Error('Error al registrar el usuario.');
            }

            console.log('Usuario registrado:', usuarioData);

            alert('Datos registrados correctamente.');

            // Reinicia los formularios
            setPerroData({
                nombre: '',
                raza: '',
                edad: '',
                dueño: '',
                observaciones: '',
            });

            setUsuarioData({
                email: '',
                password: '',
                role: 'user',
                name: '',
            });

            navigate('/adminhome');
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema al registrar los datos.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Formulario de Alta</h2>
            <form onSubmit={handleSubmit}>
                {/* Sección de Datos del Perro */}
                <h4>Datos del Perro</h4>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre del Perro:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={perroData.nombre}
                        onChange={handlePerroChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="raza" className="form-label">Raza:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="raza"
                        name="raza"
                        value={perroData.raza}
                        onChange={handlePerroChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        name="edad"
                        value={perroData.edad}
                        onChange={handlePerroChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dueño" className="form-label">Nombre del Dueño:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dueño"
                        name="dueño"
                        value={perroData.dueño}
                        onChange={handlePerroChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="observaciones" className="form-label">Observaciones:</label>
                    <textarea
                        className="form-control"
                        id="observaciones"
                        name="observaciones"
                        value={perroData.observaciones}
                        onChange={handlePerroChange}
                    />
                </div>

                {/* Sección de Datos del Usuario */}
                <h4>Datos del Usuario</h4>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={usuarioData.name}
                        onChange={handleUsuarioChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={usuarioData.email}
                        onChange={handleUsuarioChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={usuarioData.password}
                        onChange={handleUsuarioChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rol:</label>
                    <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={usuarioData.role}
                        onChange={handleUsuarioChange}
                        required
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                        <option value="guest">Invitado</option>
                    </select>
                </div>

                <Link to='/adminhome'>
                <button type="submit" className="btn btn-primary">Volver</button>
                </Link>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}

export default FormAltaClienteAnimal