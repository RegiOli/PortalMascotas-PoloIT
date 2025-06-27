// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faGear,
  faBullhorn,
  faWrench,
  faAddressCard,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Header = ({isAuthenticated}) => {
  const { user, nombre, startLogout } = useAuthStore() ;
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);
  const handleLogout = () => startLogout();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/logoPatitasencasa.jpeg"
            alt="Portal de Mascotas"
            className="logo-img"
          />
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>
        <li>
          <Link to="/jornadas">Jornadas</Link>
        </li>
        <li>
          <Link to="/donaciones">Donaciones</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link to="/login">Registro / Login</Link>
          </li>
        ) : (
          <>
            <li className="dropdown" onMouseLeave={closeDropdown}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Mi cuenta
              </button>

              {showDropdown && (
                <ul
                  className={`dropdown-menu ${
                    showDropdown ? "visible" : "hidden"
                  }`}
                >
                  <li>
                    <Link to="/user/mis-publicaciones" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faBullhorn} /> Mis Publicaciones
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/configuracion" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faGear} /> Configuración
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/aspectos-del-sistema" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faWrench} /> Aspecto del sistema
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/publicar" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faBullhorn} /> Publicar Mascota
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/formulario-adopcion" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faFileAlt} /> Formulario de
                      Adopción
                    </Link>
                  </li>
                  <li>
                    <Link to="/user/mi-perfil" onClick={closeDropdown}>
                      <FontAwesomeIcon icon={faAddressCard} /> Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-logout">
                      <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar
                      Sesión
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* {rol === "admin" && (
              <li>
                <Link to="/admin">Panel Admin</Link>
              </li>
            )} */}
          </>
        )}
      </ul>
    </nav>
  );
};
