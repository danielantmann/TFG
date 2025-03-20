import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import LavadoImg from '../assets/img/PerroLavado.avif'; // Importa la imagen correctamente
import './ServiciosComponent.css';

function ServiciosComponent() {
    // Datos reactivamente gestionados con useState
    const [servicios, setServicios] = useState([
        {
            id: 1,
            title: 'Lavado Canino',
            text: 'Lavado completo para mantener la higiene y salud de tu perro.',
            image: LavadoImg, // Usa la imagen importada
        },
        {
            id: 2,
            title: 'Corte de Pelo',
            text: 'Cortes personalizados para que tu mascota luzca espectacular.',
            image: LavadoImg, // Cambia si tienes otra imagen
        },
        {
            id: 3,
            title: 'Uñas y Almohadillas',
            text: 'Corte de uñas y cuidado de las almohadillas de tu mascota.',
            image: LavadoImg, // Cambia si tienes otra imagen
        },
    ]);

    return (
        <div className="servicios">
            <h2>Servicios</h2>
            <div className="serviciosGrid">
                {servicios.map((servicio) => (
                    <Card style={{ width: '18rem' }} key={servicio.id}>
                        <Card.Img variant="top" src={servicio.image} alt={servicio.title} />
                        <Card.Body>
                            <Card.Title>{servicio.title}</Card.Title>
                            <Card.Text>{servicio.text}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ServiciosComponent;
