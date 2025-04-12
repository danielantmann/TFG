import React from 'react'

import Tijera from '../assets/img/tijeras.png';
import Huella from '../assets/img/huella.png';
import './MidSecComponent.css';
function MidSecComponent() {
    return (
        <section className='midSection'>
            <div className='midSectionDiv'>
                <img className='midSectionImg' src={Tijera} alt="" />
                <aside className='midSectionAside'>
                    <h2>Peluquera Profesiona</h2>
                    <h4>
                        Nuestro equipo profesional presta el mejor servicio
                    </h4>
                </aside>
            </div>
            <div className='midSectionDiv'>
                <img className='midSectionImg' src={Tijera} alt="" />
                <aside className='midSectionAside'>
                    <h2>Peluquera Profesiona</h2>
                    <h4>
                        Nuestro equipo profesional presta el mejor servicio
                    </h4>
                </aside>
            </div>
            <div className='midSectionDiv'>
                <img className='midSectionImg' src={Huella} alt="" />
                <aside className='midSectionAside'>
                    <h2>Peluquera Profesiona</h2>
                    <h4>
                        Nuestro equipo profesional presta el mejor servicio
                    </h4>
                </aside>
            </div>
            <div className='midSectionDiv'>
                <img className='midSectionImg' src={Huella} alt="" />
                <aside className='midSectionAside'>
                    <h2>Peluquera Profesiona</h2>
                    <h4>
                        Nuestro equipo profesional presta el mejor servicio
                    </h4>
                </aside>
            </div>

        </section>
    )
}

export default MidSecComponent