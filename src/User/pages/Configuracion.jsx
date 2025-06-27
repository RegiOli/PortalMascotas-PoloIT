import { useState, useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import "../styles/configuracion.css";

export const Configuracion = ()=> {
  const { user, startUpdateUser, startDeleteUser } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    provincia: "",
    localidad: "",
    calle: "",
    imagenDePerfil: "",
  });

  const [mostrarModal, setMostrarModal] = useState(false);

 useEffect(() => {
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/auth/user-info", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfo = await res.json();
    console.log("✅ Datos completos:", userInfo);
    setFormData({
      nombre: userInfo.nombre || "",
      apellido: userInfo.apellido || "",
      email: userInfo.email || "",
      provincia: userInfo.provincia || "",
      localidad: userInfo.localidad || "",
      calle: userInfo.calle || "",
      imagenDePerfil: userInfo.imagenDePerfil || "",
    });
  };

  fetchUserInfo();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    const { nombre, apellido, email } = formData;
    if (!nombre.trim() || !apellido.trim() || !email.trim()) {
      alert("Por favor completa nombre, apellido y email antes de guardar.");
      return;
    }

    const success = await startUpdateUser(formData);
    if (success) {
      alert("Cambios guardados 😎");
    } else {
      alert("Ocurrió un error al guardar");
    }
  };

  const confirmarEliminacion = async () => {
    const success = await startDeleteUser();
    if (success) {
      alert("Cuenta eliminada correctamente 🫥");
      window.location.href = "/";
    } else {
      alert("No se pudo eliminar la cuenta");
    }
  };

  return (
    <div className="config-wrapper">
      <div className="config-container">
        <h1>Configuración de Cuenta</h1>

        <form onSubmit={handleGuardarCambios}>
          <section>
            <h2>Datos Personales</h2>
            <label>
              Nombre:
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>
            <label>
              Apellido:
              <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </section>

          <section>
            <h2>Dirección</h2>
            <label>
              Provincia:
              <input
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
              />
            </label>
            <label>
              Localidad:
              <input
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
              />
            </label>
            <label>
              Calle:
              <input
                name="calle"
                value={formData.calle}
                onChange={handleChange}
              />
            </label>
          </section>

          <section>
            <h2>Foto de Perfil (opcional)</h2>
            <label>
              Imagen URL:
              <input
                name="imagenDePerfil"
                value={formData.imagenDePerfil}
                onChange={handleChange}
              />
            </label>
          </section>

          <button type="submit">Guardar cambios</button>
        </form>

        <div className="extra-info">
          <p>
            <strong>Rol:</strong> {user?.rol}
          </p>
          <p>
            <strong>Miembro desde:</strong>{" "}
            {user?.creado_en ? new Date(user.creado_en).toLocaleDateString() : ""}
          </p>
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            className="btn-delete-account"
            onClick={() => setMostrarModal(true)}
          >
            Eliminar mi cuenta
          </button>
        </div>

        {mostrarModal && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3>Confirmar eliminación</h3>
              <p>
                ¿Estás seguro que querés eliminar tu cuenta? Esta acción no se
                puede deshacer.
              </p>
              <div className="modal-buttons">
                <button
                  className="btn-cancel"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn-confirm" onClick={confirmarEliminacion}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}