import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FormAltaClienteAnimal() {
    const [perroData, setPerroData] = useState({
        nombre: '',
        raza: '',  // Este es el select de razas cargado de la API
        fecha_nacimiento: '',  // Este es el nuevo campo de fecha de nacimiento
        id_usuario: '',  // Este campo no se edita directamente
        observaciones: '',
    });

    const [usuarioData, setUsuarioData] = useState({
        email: '',
        password: '',
        role: 'user',  // Predeterminado como "user", puedes cambiarlo según sea necesario
        name: '',
    });

    const [razas, setRazas] = useState([]);
    const [error, setError] = useState('');  // Estado para el mensaje de error
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

    // Cargar las razas desde la API
    useEffect(() => {
        const fetchRazas = async () => {
            try {
                const response = await fetch('http://localhost:3002/razas');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las razas.');
                }
                const data = await response.json();
                setRazas(data);  // Se espera que la respuesta sea un array de razas
            } catch (error) {
                console.error('Error al cargar las razas:', error);
            }
        };

        fetchRazas();
    }, []);  // Este efecto solo se ejecuta una vez cuando el componente se monta

    // Verificar si el email ya está registrado
    const checkEmailExists = async (email) => {
        try {
            const response = await fetch(`http://localhost:3001/usuarios?email=${email}`);
            if (!response.ok) {
                throw new Error('Error al verificar el email.');
            }
            const users = await response.json();
            return users.length > 0; // Si ya existe el email, devolver true
        } catch (error) {
            console.error('Error en la verificación del email:', error);
            return false;
        }
    };

    // Manejar el envío del formulario para ambas tablas
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar cualquier mensaje de error previo

        // Verificar si el correo electrónico ya existe
        const emailExists = await checkEmailExists(usuarioData.email);
        if (emailExists) {
            setError('El correo electrónico ya está registrado.');
            return; // No continuar con el envío si el correo existe
        }

        try {
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

            const usuario = await usuarioResponse.json(); // Recuperamos el usuario recién creado

            console.log('Usuario registrado:', usuarioData);

            // Enviar datos del perro (con id_usuario tomado del nuevo usuario)
            const perroResponse = await fetch('http://localhost:3000/perros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...perroData,
                    id_usuario: usuario.id,  // Asociamos el id del usuario creado al perro
                }),
            });

            if (!perroResponse.ok) {
                throw new Error('Error al registrar el perro.');
            }

            console.log('Perro registrado:', perroData);

            alert('Datos registrados correctamente.');

            // Reinicia los formularios
            setPerroData({
                nombre: '',
                raza: '',
                fecha_nacimiento: '',  // Reinicia el campo de fecha de nacimiento
                id_usuario: '',  // Reinicia el id_usuario también
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
                    <label htmlFor="email" className="form-label">Email:</label>
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
                    </select>
                </div>

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
                    <select
                        className="form-select"
                        id="raza"
                        name="raza"
                        value={perroData.raza}
                        onChange={handlePerroChange}
                        required
                    >
                        <option value="">Selecciona una raza</option>
                        {razas.map((raza) => (
                            <option key={raza.id} value={raza.nombre}>
                                {raza.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        value={perroData.fecha_nacimiento}
                        onChange={handlePerroChange}
                        required
                        max={new Date().toISOString().split('T')[0]}
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
                {/* Mostrar mensaje de error si existe */}
                {error && <p className="text-danger m-2">{error}</p>}
                <Link to='/adminhome'>
                    <button type="button" className="btn btn-secondary">Volver</button>
                </Link>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>


        </div>
    );
}

export default FormAltaClienteAnimal;
