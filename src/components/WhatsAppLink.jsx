import React from 'react';

const WhatsAppLink = () => {
  const phoneNumber = '+34624214579'; // Reemplaza con tu número
  const message = 'Hola,%20quiero%20más%20información'; // Mensaje predeterminado
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a href={whatsappURL} target="_blank" rel="noopener noreferrer">
      <button>Contactar por WhatsApp</button>
    </a>
  );
};

export default WhatsAppLink;
