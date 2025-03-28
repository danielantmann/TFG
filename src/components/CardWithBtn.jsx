import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function CardWithBtn({ cardImg, cardTitle, cardText, btnTxt, href, boolean = true, EmailModal }) {
  const [showModal, setShowModal] = useState(false);

  // Email constante (definido aquí en lugar de pasarlo como prop)
  const email = 'tula3x3@gmail.com'; // Reemplaza con tu email
  const emailSubject = "Consulta sobre el producto"; // Asunto del email
  const emailBody = "Hola, estoy interesado en obtener más información."; // Cuerpo del email
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Funciones para manejar la apertura y cierre del modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className='col-xl-3 col-lg-5 col-md-5 col-sm-8 d-flex justify-content-center align-items-center mt-3 mb-3'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cardImg} />
        <Card.Body>
          <Card.Title>{cardTitle}</Card.Title>
          <Card.Text>{cardText}</Card.Text>
          {/* Si 'boolean' es true, mostramos el modal al hacer clic, sino, solo abrir el enlace */}
          {boolean ? (
            <Button variant="primary" onClick={handleShow}>
              {btnTxt}
            </Button>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button variant="primary">{btnTxt}</Button>
            </a>
          )}
        </Card.Body>
      </Card>

      {/* Pasamos EmailModal como prop */}
      {EmailModal && (
        <EmailModal showModal={showModal} handleClose={handleClose} mailtoLink={mailtoLink} />
      )}
    </div>
  );
}

export default CardWithBtn;
