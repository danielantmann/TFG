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
        <div className="gallery">
            <div className="container ">
                <div className="row pt-5 pb-5">
                    {images.map((image, index) => (
                        <div className="gallery-img col-lg-4 col-md-6 col-12 p-3 " key={index}>
                            <img className="rounded w-100 h-100 img-fluid" src={image} alt={`Gallery item ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Gallery