import React, { useState } from "react";
import "../styles/recuperarContrasenia.css";

export const RecuperarContrasenia=()=> {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      res.ok ? setStep(2) : setError(data.msg || "Error al enviar el código");
    } catch (err) {
      console.error(err);
      setError("Error de conexión al servidor");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, new_password: newPassword }),
      });
      const data = await res.json();
      setMsg(data.msg || "Contraseña actualizada");
    } catch (err) {
      console.error(err);
      setMsg("Error al cambiar la contraseña");
    }
  };

  return (
    <div className="form-wrapper">
      {step === 1 && (
        <form className="form-container" onSubmit={handleRequestReset}>
          <div className="text-center mb-4">
            <span className="paw-icon">🔒</span>
            <h2>¿Olvidaste tu contraseña?</h2>
            <p>Ingresá tu correo para recibir un código de verificación</p>
          </div>

          <label htmlFor="email" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary">
            Enviar código
          </button>
          <a href="/login" className="btn-secondary">
            <svg
              class="arrow-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver al login
          </a>
        </form>
      )}

      {step === 2 && (
        <div className="form-container">
          <div className="text-center mb-4">
            <span className="mailbox-icon">📬</span>
            <h2>¡Código enviado!</h2>
            <p>
              Revisá tu correo <strong>{email}</strong> y hacé clic en
              "Verificar" para ingresar el código.
            </p>
          </div>
          <button className="btn-primary" onClick={() => setStep(3)}>
            Verificar
          </button>
        </div>
      )}

      {step === 3 && (
        <form className="form-container" onSubmit={handleResetPassword}>
          <div className="text-center mb-4">
            <span className="paw-icon">🔑</span>
            <h2>Crear nueva contraseña</h2>
          </div>

          <p>
            Correo: <strong>{email}</strong>
          </p>

          <label htmlFor="code" className="form-label">
            Código
          </label>
          <input
            id="code"
            type="text"
            placeholder="Código recibido"
            className="form-control"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <label htmlFor="new-password" className="form-label">
            Nueva contraseña
          </label>
          <input
            id="new-password"
            type="password"
            placeholder="Nueva contraseña"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Cambiar contraseña
          </button>

          {msg && (
            <p
              className={
                msg.toLowerCase().includes("error")
                  ? "error-message"
                  : "mensaje-bienvenida"
              }
            >
              {msg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
