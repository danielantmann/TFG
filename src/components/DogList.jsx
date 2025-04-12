// src/components/DogList.js
import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';
import DogModal from './DogModal';
import OwnerModalInfo from './OwnerModalInfo';

const DogList = ({ searchTerm }) => {
    const [dogs, setDogs] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [showOwnerModal, setShowOwnerModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/perros')
            .then(res => res.json())
            .then(setDogs)
            .catch(err => console.error('Error al cargar perros:', err));

        fetch('http://localhost:3001/usuarios')
            .then(res => res.json())
            .then(setUsuarios)
            .catch(err => console.error('Error al cargar usuarios:', err));
    }, []);

    const filteredDogs = dogs.filter(
        dog =>
            dog.nombre.toLowerCase().includes(searchTerm) ||
            dog.raza.toLowerCase().includes(searchTerm)
    );

    const handleOpenModal = (dog) => {
        const owner = usuarios.find(u => String(u.id) === String(dog.id_usuario));
        const ownerName = owner ? owner.name : 'Desconocido';
        const dogWithOwner = { ...dog, dueño: ownerName }; // 👈 Añadimos nombre del dueño
        setSelectedDog(dogWithOwner);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSaveDog = (updatedDog) => {
        fetch(`http://localhost:3000/perros/${updatedDog.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDog),
        })
            .then(res => res.json())
            .then(data => {
                const updatedDogs = dogs.map(d => d.id === data.id ? data : d);
                setDogs(updatedDogs);
            })
            .catch(err => console.error('Error al actualizar perro:', err));
    };

    const handleOpenOwnerModal = (ownerId) => {
        const owner = usuarios.find(u => String(u.id) === String(ownerId));
        setSelectedOwner(owner);
        setShowOwnerModal(true);
    };

    const handleCloseOwnerModal = () => setShowOwnerModal(false);

    return (
        <div className="container mt-4">
            {filteredDogs.length > 0 ? (
                filteredDogs.map((dog) => {
                    const owner = usuarios.find(u => String(u.id) === String(dog.id_usuario));
                    const ownerName = owner ? owner.name : 'Desconocido';
                    return (
                        <DogCard
                            key={dog.id}
                            nombre={dog.nombre}
                            raza={dog.raza}
                            fecha_nacimiento={dog.fecha_nacimiento}
                            dueño={ownerName}
                            observaciones={dog.observaciones}
                            onOpenModal={() => handleOpenModal(dog)}
                            onOwnerClick={() => handleOpenOwnerModal(dog.id_usuario)}
                        />
                    );
                })
            ) : (
                <p>No se encontraron fichas.</p>
            )}

            {selectedDog && (
                <DogModal
                    dog={selectedDog}
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveDog}
                />
            )}

            {selectedOwner && (
                <OwnerModalInfo
                    show={showOwnerModal}
                    handleClose={handleCloseOwnerModal}
                    owner={selectedOwner}
                />
            )}
        </div>
    );
};

export default DogList;
