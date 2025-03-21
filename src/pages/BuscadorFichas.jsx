import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import DogList from '../components/DogList';

function BuscadorFichas() {
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [searchQuery, setSearchQuery] = useState(''); // Estado para el término confirmado al buscar

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Función para manejar el evento submit del formulario
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Previene la recarga de la página
        setSearchQuery(searchTerm); // Actualiza el estado con el término de búsqueda confirmado
    };

    return (
        <>
            <HeaderComponent />
            <div className="container">
                <h1>Buscador de fichas</h1>
                {/* Campo de búsqueda */}
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Buscar ficha"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        style={{
                            width: '80%',
                            padding: '10px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '1px solid #ddd',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '5px',
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        Buscar
                    </button>
                </form>
            </div>
            {/* Pasa el término de búsqueda confirmado a DogList */}
            <DogList searchTerm={searchQuery} />
        </>
    );
}

export default BuscadorFichas;
