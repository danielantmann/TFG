import React from 'react';
import CardWithBtn from './CardWithBtn';
import WhatsApp from '../assets/img/whatsapp.svg';
import Calendar from '../assets/img/calendar.ico';
import Email from '../assets/img/email.png';
import './ContactoLinks.css';
import EmailModal from './EmailModal';  // Importamos el EmailModal

export default function ContactoLinks() {
  const phoneNumber = '+34624214579'; // Reemplaza con tu número
  const message = 'Hola,%20quiero%20más%20información'; // Mensaje predeterminado
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="contacto-container">
      <div className="card-container">
        {/* Calendario */}
        <CardWithBtn
          cardImg={Calendar}
          cardTitle="Citas Online"
          cardText="Ver el calendario para solicitar una cita"
          btnTxt="IR"
          href="#"
          boolean={false} // No se necesita modal aquí
        />

        {/* WhatsApp */}
        <CardWithBtn
          cardImg={WhatsApp}
          cardTitle="WhatsApp"
          cardText="Ponte En contacto mediante WhatsApp"
          btnTxt="IR"
          href={whatsappURL}
          boolean={false} // No se necesita modal aquí
        />

        {/* Email */}
        <CardWithBtn
          cardImg={Email}
          cardTitle="E-mail"
          cardText="Ponte En contacto mediante E-mail"
          btnTxt="IR"
          boolean={true} // Usamos el modal
          EmailModal={EmailModal} // Pasamos el EmailModal como prop
        />
      </div>
    </div>
  );
}
