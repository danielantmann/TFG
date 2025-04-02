import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function CardCitas() {
    const { usuario, idUsuario } = useContext(UserContext);
    const [citas, setCitas] = useState([]);
    const [perro, setPerro] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [primeraCita, setPrimeraCita] = useState(() => {
        const storedCita = sessionStorage.getItem('primeraCita');
        return storedCita ? JSON.parse(storedCita) : null;
    });
        const time = new Date();

    useEffect(() => {
        const obtenerCitas = async () => {
            try {
                const response = await fetch("http://localhost:3003/citas");
                const data = await response.json();
                const citasValidas = data.filter(cita => new Date(cita.start) >= time);
                const citasOrdenadas = citasValidas.sort((a, b) => new Date(a.start) - new Date(b.start));
                if (citasOrdenadas.length > 0) {
                    setPrimeraCita(citasOrdenadas[0]);
                }
                setCitas(citasOrdenadas);
            } catch (error) {
                console.error("Error al cargar las citas:", error);
                setErrorMessage('Error al cargar las citas.');
            }
        };

        const obtenerPerro = async () => {
            try {
                const response = await fetch(`http://localhost:3000/perros`);
                const data = await response.json();
               
                
                const perroDelUsuario = data.find(p => p.id_usuario === idUsuario);
                setPerro(perroDelUsuario);
                console.log("perro usuario" + perroDelUsuario);
                
            } catch (error) {
                console.error("Error al cargar los perros:", error);
                setErrorMessage('Error al cargar el perro.');
            }
        };

        if (usuario === 'admin') {
            obtenerCitas();
        } else if (usuario === 'user') {
            obtenerPerro();
        }
    }, [usuario, idUsuario]);

    useEffect(() => {
        if (usuario === 'user' && perro) {
            const obtenerCitasDePerro = async () => {
                try {
                    const response = await fetch("http://localhost:3003/citas");
                    const data = await response.json();
                    const citasDePerro = data.filter(cita => cita.id_perro === perro.id && new Date(cita.start) >= time);
    
                    if (citasDePerro.length > 0) {
                        setPrimeraCita(citasDePerro[0]);
                        // Guardar la cita en sessionStorage
                        sessionStorage.setItem('primeraCita', JSON.stringify(citasDePerro[0]));
                    } else {
                        setPrimeraCita(null);
                        sessionStorage.removeItem('primeraCita'); // Eliminar si no hay citas
                    }
                } catch (error) {
                    console.error("Error al cargar las citas del perro:", error);
                    setErrorMessage('Error al cargar las citas del perro.');
                }
            };
    
            obtenerCitasDePerro();
        }
    }, [usuario, perro, time]);
    

    return (
        <div className="container">
            <div className="card mb-3" style={{ maxWidth: "80%", justifyContent: "center", margin: "auto" }}>
                <div className="row g-0">
                    <div className="col-md-2">
                        <img src="https://img.icons8.com/?size=100&id=34&format=png&color=000000" className="img-fluid rounded-start" alt="Imagen de una cita" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {primeraCita ? (
                                <>
                                    <h5 className="card-title">{primeraCita.title}</h5>
                                    <p className="card-text">
                                        <span>Fecha:</span> {new Date(primeraCita.start).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <span>Hora:</span> {new Date(primeraCita.start).toLocaleTimeString()}
                                    </p>
                                </>
                            ) : (
                                <p className="card-text" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2em' }}>
                                    No hay próximas citas
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    {usuario === 'admin' && (
                        <Link to="/admincitas">
                            <button type="button" className="btn btn-outline-info">
                                Ir al Calendario
                            </button>
                        </Link>
                    )}
                    <button type="button" className="btn btn-outline-info" onClick={() => window.location.reload()}>
                        Recargar Citas
                    </button>
                </div>
            </div>

            {/* Mostrar más citas si el usuario es admin */}
            {usuario === 'admin' && (
                <div className="row">
                    {citas.slice(1).map((cita, index) => (
                        <div className="col-md-6" key={index}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{cita.title}</h5>
                                    <p className="card-text">
                                        <span>Fecha:</span> {new Date(cita.start).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <span>Hora:</span> {new Date(cita.start).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}