// src/components/DogCard.js
import React from 'react';

function UserCard({ name, email, onOpenModal, deleteUser }) {
    return (
        <div className="card my-3">
            <div className="card-header">
                <h2>{name}</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title"><strong>Email: </strong> {email}</h5>
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 w-100">
                    <button className="btn btn-primary" onClick={onOpenModal}>Modificar</button>
                    <button className="btn btn-primary" onClick={deleteUser}>Dar de baja</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
