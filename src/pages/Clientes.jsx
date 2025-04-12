import React, { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import UserList from '../components/UserList';

function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <>
      <HeaderComponent />
      <div className="container">
        <h1>Buscador de Clientes</h1>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar cliente"
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
        <UserList searchTerm={searchQuery} />
      </div>
    </>
  );
}

export default Clientes;
