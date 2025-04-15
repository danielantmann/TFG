import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const OwnerModalInfo = ({ show, handleClose, owner }) => {
    if (!owner) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Información del Dueño</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Nombre:</strong> {owner.name}</p>
                <p><strong>Email:</strong> {owner.email}</p>
                <p><strong>Rol:</strong> {owner.role}</p>
                <p><strong>ID:</strong> {owner.id}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OwnerModalInfo;
