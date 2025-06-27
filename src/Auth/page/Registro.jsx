import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import '../styles/registro.css';

export const Registro = () => {
  const navigate = useNavigate();
  const { startRegister, errorMessage, status } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (status === 'not-authenticated' && errorMessage === 'Registrado correctamente. Iniciá sesión.') {
      setSuccessMessage(errorMessage);
      setTimeout(() => navigate('/login'), 3000);
    }
  }, [errorMessage, status, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Las contraseñas no coinciden.');
      return;
    }

    const { confirmPassword, ...dataToSend } = formData;
    console.log(dataToSend)
    startRegister(dataToSend);
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="text-center mb-4">
          <span className="paw-icon">🐾</span>
          <h2 className="d-inline">Registrarse</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Tu apellido"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@dominio.com"
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Crea tu contraseña"
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          {localError && <p className="error-message">{localError}</p>}
          {errorMessage && errorMessage !== 'Registrado correctamente. Iniciá sesión.' && (
            <p className="error-message">{errorMessage}</p>
          )}
          {successMessage && <p className="success-message">{successMessage}</p>}

          <div className="d-grid mb-3">
            <button type="submit" className="btn-primary" disabled={status === 'checking'}>
              {status === 'checking' ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
          <div className="text-center">
            <p>¿Ya tenés cuenta? <Link style={{ color: '#6d2e35' }} to="/login">Inicia sesión acá</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};
