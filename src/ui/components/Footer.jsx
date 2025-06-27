import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; 
import '../styles/footer.css';

export const Footer = ()=> {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo">Portal de Mascotas 🐾</Link>
          <p className="footer-slogan">Tu mejor amigo te esta esperando!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/tupaginadefacebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/tucuentaoficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/tucuentaoficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h3>Navegación</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jornadas">Jornadas</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/login">Mi Cuenta</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h3>Contacto</h3>
          <p><FaMapMarkerAlt /> Calle Ficticia 123, Buenos Aires, Argentina</p>
          <p><FaPhone /> +54 9 11 1234 5678</p>
          <p><FaEnvelope /> info@portaldemascotas.com.ar</p>
        </div>

        <div className="footer-section footer-map">
          <h3>Dónde Encontrarnos</h3>
          <p>Visítanos o encuéntranos en Google Maps.</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Portal de Mascotas 🐾 - Todos los derechos reservados.</p>
        <p>Hecho con ❤️ para los amantes de las mascotas</p>
      </div>
    </footer>
  );
}
