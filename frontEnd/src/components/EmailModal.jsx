import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EmailModal({ showModal, handleClose, mailtoLink }) {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enviar correo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas enviar un correo?
            <br />
            Redireccion a tu aplicacion de correos
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <a href={mailtoLink} style={{ textDecoration: 'none' }}>
          <Button variant="primary" onClick={handleClose}>
            Enviar Email
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default EmailModal;
