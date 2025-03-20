import React from 'react'
import './Gallery.css';
import PerreteGrooming from '../assets/img/perretegrooming.jpg';
import PerreteGrooming2 from '../assets/img/perretegrooming2.jpg';
import PerreteGrooming3 from '../assets/img/perretegrooming3.jpg';

const images = [
    PerreteGrooming,
    PerreteGrooming2,
    PerreteGrooming3,
    PerreteGrooming,
    PerreteGrooming2,
    PerreteGrooming3
]

function Gallery() {
    return (
       <div className="galery"> 
        <div className="galleryContainer">
            <div className="gallery">
                {images.map((image, index) => (
                    <div className="gallery-item" key={index}>
                        <img className="gallery-img" src={image} alt={`Gallery item ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Gallery