import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselComponent from '../components/CarruselComponent'
import MidSecComponent from '../components/MidSecComponent'
import Gallery from '../components/Gallery'
import ServiciosComponent from '../components/ServiciosComponent'
import ContactoLinks from '../components/ContactoLinks'
import Footer from '../components/footer';

export default function Home() {
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <CarruselComponent></CarruselComponent>
            <ServiciosComponent></ServiciosComponent>
            <Gallery></Gallery>
            <ContactoLinks> </ContactoLinks>
            <MidSecComponent></MidSecComponent>
            <Footer></Footer>
        </>
    )
}
