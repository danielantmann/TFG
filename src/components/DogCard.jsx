import React from 'react'
import Card from 'react-bootstrap/Card';

function DogCard({ nombre, raza, edad, dueño, observaciones, onOpenModal }) {
    return (

        <div className="card">
            <div className="card-header">
                <h2>{nombre}</h2>
            </div>
            <div className="card-body">
                <h5 className="card-title"> <strong>Raza:</strong> {raza}</h5>
                <h5 className="card-title"> <strong>Edad:</strong> {edad} años</h5>
                <h5 className="card-title"> <strong>Dueño:</strong> {dueño}</h5>
                <h5 className="card-title">             <strong>Observaciones:</strong> {observaciones}</h5>
                <a href="#" className="btn btn-primary" onClick={onOpenModal}>Ver Ficha</a>
            </div>
        </div>



    )
}

export default DogCard