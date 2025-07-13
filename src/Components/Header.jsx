import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, onLogout, isAdmin }) => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <header className="mb-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm rounded-bottom">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            🎮 Games Library
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/videojuegos">
                  Mis videojuegos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/agregar-videojuego">
                  Añadir videojuego
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/guess-boss">
                  Soulsdle
                </Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link text-warning fw-bold" to="/admin">
                    Administración
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ms-auto">
              {user ? (
                <li className="nav-item d-flex align-items-center gap-2">
                  {user.picture && (
                    <img
                      src={user.picture}
                      alt="Perfil"
                      className="rounded-circle border border-light"
                      width="40"
                      height="40"
                    />
                  )}
                  <span className="text-white fw-semibold me-2">{user.username}</span>
                  <button className="btn btn-sm btn-outline-light" onClick={onLogout}>
                    Cerrar sesión
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={handleLogin}>
                    Iniciar sesión con Google
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;