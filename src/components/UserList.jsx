// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import UserModal from './UserModal';
import UserCard from './UserCard';

const UserList = ({ searchTerm }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    
    const showTemporaryAlert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };
    
    useEffect(() => {
        fetch('http://localhost:3001/usuarios')
            .then(res => res.json())
            .then(setUsuarios)
            .catch(err => console.error('Error al cargar usuarios:', err));
    }, []);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleSaveUser = (updatedUser) => {
        fetch(`http://localhost:3001/usuarios/${updatedUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then((data) => {
                const updatedList = usuarios.map(u => u.id === data.id ? data : u);
                setUsuarios(updatedList);
            })
            .catch(err => console.error('Error al guardar usuario:', err));
    };

    const deleteUsuario = async (usuarioId) => {
        try {
            const response = await fetch(`http://localhost:3001/usuarios/${usuarioId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }

            // Eliminar del estado local para actualizar la lista
            const nuevaLista = usuarios.filter(user => user.id !== usuarioId);
            setUsuarios(nuevaLista);
            showTemporaryAlert(`Usuario ${usuarioId} eliminado correctamente.`);
        } catch (error) {
            console.error('Hubo un error al eliminar:', error);
        }
    };
    


    const filteredUsers = usuarios
    .filter(user => String(user.id) !== "1") // 👈 Oculta el admin
    .filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );


    console.log(filteredUsers);
    

    return (
        <div className="container mt-4">
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        onOpenModal={() => handleOpenModal(user)}
                        deleteUser={() => deleteUsuario(user.id)}
                    />
                ))
            ) : (
                <p>No hay usuarios para mostrar.</p>
            )}

            {selectedUser && (
                <UserModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
                    handleSave={handleSaveUser}
                />
            )}
            {showAlert && (
                <div
                    className="alert alert-success text-center position-fixed top-0 start-0 w-100 z-3"
                    role="alert"
                    style={{ zIndex: 9999 }}
                >
                    {alertMessage}
                </div>
            )}

        </div>
    );
};

export default UserList;
