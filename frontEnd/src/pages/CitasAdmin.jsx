import React from 'react';
import CalendarioAdmin from '../components/CalendarioAdmin.jsx';
import HeaderComponent from '../components/HeaderComponent.jsx';

function CitasAdmin() {
  return (
    <div>
      <HeaderComponent/>
      <h1>Gestión de Citas</h1>
      {/* Excluye solo el CalendarioAdmin de StrictMode */}
      <NoStrictMode>
        <CalendarioAdmin />
      </NoStrictMode>
    </div>
  );
}

// Define un componente para excluir StrictMode
function NoStrictMode({ children }) {
  
  return <>{children}</>;
}

export default CitasAdmin;
