import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';
import DogModal from './DogModal';

const DogList = ({ searchTerm }) => {
    const [dogs, setDogs] = useState([]);
    const [selectedDog, setSelectedDog] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/perros') // Cambia la ruta al endpoint del servidor
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos: ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => setDogs(data)) // Almacena los datos directamente en el estado
            .catch((error) => console.error('Error al cargar los datos:', error));
    }, []);
    

    const filteredDogs = dogs.filter(
        (dog) =>
            dog.nombre.toLowerCase().includes(searchTerm) ||
            dog.raza.toLowerCase().includes(searchTerm)
    );

    const handleOpenModal = (dog) => {
        setSelectedDog(dog);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveDog = (updatedDog) => {
        // Hacer una solicitud PUT al backend para guardar los cambios
        fetch(`http://localhost:3000/perros/${updatedDog.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDog),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Datos actualizados:', data);
                // Actualiza el estado local para reflejar los cambios en la interfaz
                const updatedDogs = dogs.map((dog) =>
                    dog.id === data.id ? data : dog
                );
                setDogs(updatedDogs);
                
            })
            .catch((error) => console.error('Error al guardar los datos:', error));
    };
    

    return (
        <div>
            {filteredDogs.length > 0 ? (
                filteredDogs.map((dog) => (
                    <DogCard
                        key={dog.id}
                        nombre={dog.nombre}
                        raza={dog.raza}
                        edad={dog.edad}
                        dueño={dog.dueño}
                        observaciones={dog.observaciones}
                        onOpenModal={() => handleOpenModal(dog)}
                    />
                ))
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
        </div>
    );
};

export default DogList;
