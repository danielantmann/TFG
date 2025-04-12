// src/components/UserModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserModal = ({ user, show, handleClose, handleSave }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setNombre(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = () => {
    const updatedUser = { ...user, name: nombre, email };
    handleSave(updatedUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Text className="text-muted">
            * La contraseña no se muestra ni se modifica desde aquí.
          </Form.Text>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
