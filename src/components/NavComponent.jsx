import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LogInModal from './LogInModal';
import { UserContext } from '../context/UserContext';

export default function NavComponent() {
  const { usuario, handleLogout } = useContext(UserContext); // Consumo del contexto
  const [showLogInModal, setShowLogInModal] = useState(false);

  const handleLogInModal = () => {
    setShowLogInModal(!showLogInModal);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/galeria">Galería</Link>
            </li>
            {usuario === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/adminhome">Mi Perfil</Link>
              </li>
            )}
            {usuario === 'user' && (
              <li className="nav-item">
              <Link className="nav-link" to="/userhome">Mi Perfil</Link>
            </li>
            )}
            <li className="nav-item">
              {usuario ? (
                <Link className="nav-link btn btn-link" onClick={handleLogout}>
                  Log out
                </Link>
              ) : (
                <Link className="nav-link btn btn-link" onClick={handleLogInModal}>
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>

      {!usuario && showLogInModal && (
        <LogInModal
          show={showLogInModal}
          handleLoginModal={handleLogInModal}
        />
      )}
    </nav>
  );
}
