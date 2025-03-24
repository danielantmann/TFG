import React from 'react';

export default function CardCitas() {
    return (
        <div className="card mb-3" style={{ maxWidth: "80%", justifyContent: "center", margin: "auto" }}>
            <div className="row g-0">
                {/* Columna de la Imagen */}
                <div className="col-md-2">
                    <img src="https://img.icons8.com/?size=100&id=34&format=png&color=000000" className="img-fluid rounded-start" alt="Imagen de una cita" />
                </div>
                {/* Columna del Contenido */}
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Perro X</h5>
                        <p className="card-text">
                            <span>Fecha:</span> xx/xx/xxxx
                        </p>
                        <p className="card-text">
                            <span>Hora:</span> XX:XX
                        </p>
                    </div>
                </div>

            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-outline-info">Ir al Calendario</button>
            </div>
        </div>
    );
}
