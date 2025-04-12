import React from 'react';
import { Carousel } from 'react-bootstrap';
import PerreteGrooming from '../assets/img/perretegrooming.jpg';
import PerreteGrooming2 from '../assets/img/perretegrooming2.jpg';
import PerreteGrooming3 from '../assets/img/perretegrooming3.jpg';
import PerreteGrooming4 from '../assets/img/corte-pelo.jpg';
import PerreteGrooming5 from '../assets/img/cortar-pelo2.jpg';
import './Carrusel.css'

const CarruselComponent = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100 carruselImg"
                    src={PerreteGrooming4}
                    alt="Primera imagen"
                />
                <Carousel.Caption>
                    <h3>Primera Imagen</h3>
                    <p>Descripción de la primera imagen.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carruselImg"
                    src={PerreteGrooming5}
                    alt="Segunda imagen"
                />
                <Carousel.Caption>
                    <h3>Segunda Imagen</h3>
                    <p>Descripción de la segunda imagen.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 carruselImg"
                    src={PerreteGrooming3}
                    alt="Tercera imagen"
                />
                <Carousel.Caption>
                    <h3>Tercera Imagen</h3>
                    <p>Descripción de la tercera imagen.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarruselComponent;
