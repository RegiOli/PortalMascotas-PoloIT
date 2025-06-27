import { useState, useEffect } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useMyPetsStore } from "../../hooks/useMyPetsStore";
import Swal from "sweetalert2";
import "../styles/mi-perfil.css";

export const MiPerfil = () => {
  const { user, loading, startLogout, startUpdateUser } = useAuthStore();
  const { pets, startLoadingMyPets } = useMyPetsStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const [cantidadPublicaciones, setCantidadPublicaciones] = useState(0);
  const [cantidadAdopciones, setCantidadAdopciones] = useState(0);

  // Cuando user cambia, actualizo formData
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        localidad: user.localidad || "",
        apellido: user.apellido || "",
        provincia: user.provincia || "",
        calle: user.calle || "",
        imagenDePerfil: user.imagenDePerfil || "",
      });
    }
  }, [user]);

  // Cargo mascotas para estadísticas cuando hay user
  useEffect(() => {
    if (user) {
      startLoadingMyPets();
    }
  }, [user]);

  // Actualizo estadísticas según mascotas
  useEffect(() => {
    if (pets) {
      setCantidadPublicaciones(pets.length);
      setCantidadAdopciones(pets.filter((p) => p.estado === "adoptado").length);
    }
  }, [pets]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGuardar = async () => {
    if (!formData) return;
    const success = await startUpdateUser(formData);
    if (success) {
      setModalOpen(false);
      Swal.fire({
        icon: "success",
        title: "¡Perfil actualizado!",
        text: "Tus cambios se guardaron correctamente.",
        confirmButtonColor: "#3085d6",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al actualizar tu perfil.",
        confirmButtonColor: "#d33",
      });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>Usuario no autenticado</p>;

  return (
    <div className="perfil-wrapper">
      <div className="perfil-card">
        <div className="perfil-foto">
          {user.imagenDePerfil ? (
            <img src={user.imagenDePerfil} alt="Foto de perfil" />
          ) : (
            <div className="icono-usuario">👩‍💻</div>
          )}
        </div>
        <h2>{user.nombre}</h2>
        <p>Email: {user.email}</p>
        <p>Ciudad: {user.localidad || "Desconocida"}</p>
        <p>Rol: {user.rol}</p>

        <div className="perfil-estadisticas">
          <div>
            <strong>{cantidadPublicaciones}</strong>
            <span>Publicaciones</span>
          </div>
          <div>
            <strong>{cantidadAdopciones}</strong>
            <span>Adopciones</span>
          </div>
        </div>

        <div className="perfil-botones">
          <button onClick={() => setModalOpen(true)}>Editar Perfil</button>
          <button className="cerrar-sesion" onClick={startLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {modalOpen && formData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Perfil</h3>
            <label>
              Nombre:
              <input name="nombre" value={formData.nombre} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input name="email" type="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Ciudad:
              <input name="localidad" value={formData.localidad} onChange={handleChange} />
            </label>
            <div className="modal-buttons">
              <button onClick={handleGuardar}>Guardar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
