// src/components/DogCard.js
import React from 'react';

function DogCard({ nombre, raza, fecha_nacimiento, dueño, observaciones, onOpenModal, onOwnerClick }) {
    return (
        <div className="card my-3">
            <div className="card-header">
                <h2>{nombre}</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title"><strong>Raza:</strong> {raza}</h5>
                <h5 className="card-title"><strong>Fecha de Nacimiento:</strong> {fecha_nacimiento}</h5>
                <h5 className="card-title">
                    <strong>Dueño:</strong>{' '}
                    <span
                        style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={onOwnerClick}
                    >
                        {dueño}
                    </span>
                </h5>
                <h5 className="card-title"><strong>Observaciones:</strong> {observaciones}</h5>
                <button className="btn btn-primary" onClick={onOpenModal}>Ver Ficha</button>
            </div>
        </div>
    );
}

export default DogCard;
