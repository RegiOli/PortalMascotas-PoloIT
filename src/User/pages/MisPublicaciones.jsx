import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMyPetsStore } from "../../hooks/useMyPetsStore";
import Swal from "sweetalert2";
import "../styles/mis-publicaciones.css";

export const MisPublicaciones = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    pets,
    isLoading,
    startLoadingMyPets,
    startUpdatingPet,
    startDeletingPet,
  } = useMyPetsStore();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
console.log(user)
  const iniciales = user
    ? (user.nombre?.[0] || "") + (user.apellido?.[0] || "")
    : "";

  useEffect(() => {
    startLoadingMyPets();
  }, []);

  const abrirModalEdicion = async (mascota) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/mascotas/${mascota.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al traer datos completos");

      const mascotaCompleta = await res.json();
      setMascotaSeleccionada(mascotaCompleta);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo cargar la información completa de la mascota.", "error");
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setMascotaSeleccionada(null);
  };

  const editarMascota = async (mascotaEditada) => {
    try {
      await startUpdatingPet(mascotaEditada);

      // Actualizar localmente para que la UI se refresque rápido
      // (opcional, si startUpdatingPet ya actualiza el store)
      // setMascotas((prev) =>
      //   prev.map((m) => (m.id === mascotaEditada.id ? { ...m, ...mascotaEditada } : m))
      // );

      cerrarModal();
      Swal.fire("¡Guardado!", "La publicación fue actualizada correctamente.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo editar la publicación.", "error");
    }
  };

  const confirmarEliminacion = (mascota) => {
    Swal.fire({
      title: `¿Eliminar a ${mascota.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingPet(mascota.id);
      }
    });
  };

  return (
    <div className="mis-publicaciones">
      <header className="publicaciones-header">
        <h1>MIS PUBLICACIONES</h1>
        <p>Administra tus publicaciones de mascotas en adopción o tránsito</p>
        <div className="huella-decorativa" />
      </header>

      <div className="publicaciones-content">
        <aside className="perfil-usuario">
          <div className="avatar">
            {user?.imagenDePerfil ? (
              <img
                src={user.imagenDePerfil}
                alt="Avatar del usuario"
                className="avatar-imagen"
              />
            ) : (
              <h2>Usuario</h2>
            )}
            <div className="iniciales">{iniciales.toUpperCase()}</div>
          </div>
          <h2>{user?.name || "Usuario"}</h2>

          <div className="info">
            <p><strong>Acerca de</strong></p>
            <p>🏠 {user?.organizacion || "Tu Organización - Refugio - ONGs"}</p>
            <p>📍 {user?.localidad || "Tu Ubicación"}</p>

            <p><strong>Contacto</strong></p>
            <p>✉️ {user?.email || "sin-email@ejemplo.com"}</p>
          </div>
        </aside>

        <section className="lista-publicaciones">
          {isLoading ? (
            <p>Cargando publicaciones...</p>
          ) : (
            pets.map((mascota) => (
              <div className="tarjeta-mascota" key={mascota.id}>
                <img src={mascota.imagen_url} alt={mascota.nombre} />
                <div className="info-mascota">
                  <h3>{mascota.nombre}</h3>
                  <p>{mascota.edad}</p>
                  <p className="estado">{mascota.estado}</p>
                  <div className="acciones">
                    <button className="editar" onClick={() => abrirModalEdicion(mascota)}>
                      Editar
                    </button>
                    <button className="eliminar" onClick={() => confirmarEliminacion(mascota)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>

        {mostrarModal && mascotaSeleccionada && (
          <div className="modal-overlay">
            <div className="modal-contenido">
              <h2>Editar Mascota</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editarMascota(mascotaSeleccionada);
                }}
              >
                <label>Nombre</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.nombre || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      nombre: e.target.value,
                    })
                  }
                  required
                />

                <label>Especie</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.especie || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      especie: e.target.value,
                    })
                  }
                  required
                />

                <label>Raza</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.raza || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      raza: e.target.value,
                    })
                  }
                />

                <label>Edad</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.edad || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      edad: e.target.value,
                    })
                  }
                />

                <label>Sexo</label>
                <select
                  value={mascotaSeleccionada.sexo || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      sexo: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccionar sexo</option>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                  <option value="desconocido">Desconocido</option>
                </select>

                <label>Imagen URL</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.imagen_url || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      imagen_url: e.target.value,
                    })
                  }
                />

                <label>Estado</label>
                <select
                  value={mascotaSeleccionada.estado || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      estado: e.target.value,
                    })
                  }
                >
                  <option value="opcion">Elija una opción</option>
                  <option value="disponible">Disponible</option>
                  <option value="adopción">Adopción</option>
                  <option value="en tránsito">En Tránsito</option>
                  <option value="adoptado">Adoptado</option>
                </select>

                <label>Salud</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.salud || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      salud: e.target.value,
                    })
                  }
                />

                <label>Tamaño</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.tamanio || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      tamanio: e.target.value,
                    })
                  }
                />

                <label>Ubicación</label>
                <input
                  type="text"
                  value={mascotaSeleccionada.ubicacion || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      ubicacion: e.target.value,
                    })
                  }
                />

                <label>Info Adicional</label>
                <textarea
                  value={mascotaSeleccionada.info_adicional || ""}
                  onChange={(e) =>
                    setMascotaSeleccionada({
                      ...mascotaSeleccionada,
                      info_adicional: e.target.value,
                    })
                  }
                />

                <button type="submit">Guardar Cambios</button>
                <button type="button" onClick={cerrarModal}>
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisPublicaciones;
