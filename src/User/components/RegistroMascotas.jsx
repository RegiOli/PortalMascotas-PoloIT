import { useState } from "react";
import { useMyPetsStore } from "../../hooks/useMyPetsStore";
import "../styles/registro-mascotas.css";

export const RegistroMascota = () => {
  const [fotoMascota, setFotoMascota] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [razaMascota, setRazaMascota] = useState("");
  const [nombreMascota, setNombreMascota] = useState("");
  const [edadMascota, setEdadMascota] = useState("");
  const [saludMascota, setSaludMascota] = useState("");
  const [tamanioMascota, setTamanioMascota] = useState("");
  const [sexoMascota, setSexoMascota] = useState("");
  const [estadodeAdopcion, setestadodeAdopcion] = useState("");
  const [zonaOciudad, setzonaOciudad] = useState("");
  const [infoAdicional, setInfoAdicional] = useState("");

  const { startRegisterPet } = useMyPetsStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mascota = {
      nombre: nombreMascota,
      especie: tipoMascota,
      raza: razaMascota,
      edad: edadMascota,
      sexo: sexoMascota.toLowerCase(),
      imagen_url: fotoMascota,
      estado: estadodeAdopcion.toLowerCase(),
      salud: saludMascota,
      tamanio: tamanioMascota,
      ubicacion: zonaOciudad,
      info_adicional: infoAdicional,
    };

    await startRegisterPet(mascota);

    // Limpiar formulario
    setFotoMascota("");
    setTipoMascota("");
    setRazaMascota("");
    setNombreMascota("");
    setEdadMascota("");
    setSaludMascota("");
    setTamanioMascota("");
    setSexoMascota("");
    setestadodeAdopcion("");
    setzonaOciudad("");
    setInfoAdicional("");
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="text-center mb-4">
          <span className="paw-icon">🐾</span>
          <h2 className="d-inline">Registrar Mascota</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fotoMascota" className="form-label">
              URL de la foto de la mascota
            </label>
            <input
              type="url"
              className="form-control"
              id="fotoMascota"
              placeholder="https://ejemplo.com/imagen.jpg"
              value={fotoMascota}
              onChange={(e) => setFotoMascota(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipoMascota" className="form-label">
              Tipo de mascota
            </label>
            <select
              className="form-select"
              id="tipoMascota"
              value={tipoMascota}
              onChange={(e) => setTipoMascota(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="razaMascota" className="form-label">
              Raza
            </label>
            <input
              type="text"
              className="form-control"
              id="razaMascota"
              placeholder="Ej: Labrador o Mestizo"
              value={razaMascota}
              onChange={(e) => setRazaMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombreMascota" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombreMascota"
              placeholder="Ej: Max"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edadMascota" className="form-label">
              Edad aproximada
            </label>
            <input
              type="text"
              className="form-control"
              id="edadMascota"
              placeholder="Edad"
              value={edadMascota}
              onChange={(e) => setEdadMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="saludMascota" className="form-label">
              Salud
            </label>
            <input
              type="text"
              className="form-control"
              id="saludMascota"
              placeholder="Ej: Vacunado, sano, necesita tratamiento..."
              value={saludMascota}
              onChange={(e) => setSaludMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sexoMascota" className="form-label">
              Sexo de la mascota
            </label>
            <select
              className="form-select"
              id="sexoMascota"
              value={sexoMascota}
              onChange={(e) => setSexoMascota(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="hembra">Hembra</option>
              <option value="macho">Macho</option>
              <option value="desconocido">Desconocido</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="tamanioMascota" className="form-label">
              Tamaño
            </label>
            <input
              type="text"
              className="form-control"
              id="tamanioMascota"
              placeholder="Ej: Pequeño, mediano, grande"
              value={tamanioMascota}
              onChange={(e) => setTamanioMascota(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="estadodeAdopcion" className="form-label">
              Estado de Adopción
            </label>
            <textarea
              className="form-control"
              id="estadodeAdopcion"
              rows="2"
              placeholder="disponible, en tránsito, etc."
              value={estadodeAdopcion}
              onChange={(e) => setestadodeAdopcion(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="zonaOciudad" className="form-label">
              Zona o Ciudad
            </label>
            <input
              type="text"
              className="form-control"
              id="zonaOciudad"
              placeholder="Ej: San Luis, Córdoba, etc."
              value={zonaOciudad}
              onChange={(e) => setzonaOciudad(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="infoAdicional" className="form-label">
              Información adicional (opcional)
            </label>
            <textarea
              className="form-control"
              id="infoAdicional"
              rows="2"
              placeholder="Comentarios adicionales..."
              value={infoAdicional}
              onChange={(e) => setInfoAdicional(e.target.value)}
            ></textarea>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn-primary">
              Registrar Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
