// src/components/DogModal.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DogModal = ({ dog, show, handleClose, handleSave }) => {
    const [observaciones, setObservaciones] = useState(dog ? dog.observaciones : '');

    useEffect(() => {
        if (dog) {
            setObservaciones(dog.observaciones || '');
        }
    }, [dog]);

    const handleChange = (e) => {
        setObservaciones(e.target.value);
    };

    const handleSaveClick = () => {
        handleSave({ ...dog, observaciones });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{dog.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Raza:</strong> {dog.raza}</p>
                <p><strong>Fecha de nacimiento:</strong> {dog.fecha_nacimiento}</p>
                <p><strong>Dueño:</strong> {dog.dueño}</p> {/* 👈 Mostramos el nombre del dueño */}
                <p><strong>Observaciones:</strong></p>
                <textarea
                    value={observaciones}
                    onChange={handleChange}
                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px' }}
                ></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSaveClick}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DogModal;
