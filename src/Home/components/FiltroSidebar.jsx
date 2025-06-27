import { useState, useEffect } from "react";
import { Accordion, Form, Button, Spinner } from "react-bootstrap";
import "./../styles/filtroSidebar.css";

const traducciones = {
  especie: "Especie",
  estado: "Estado",
  tamanio: "Tamaño",
  ubicacion: "Ubicación",
};

const FiltroSidebar = ({ filtros, setFiltros }) => {
  const opcionesPorDefecto = {
    especie: ["Perro", "Gato", "Conejo", "Ave"],
    estado: ["Disponible", "Adoptado", "En tránsito"],
    tamanio: ["Pequeño", "Mediano", "Grande"],
    ubicacion: ["CABA", "Buenos Aires", "Córdoba", "Santa Fe"],
  };

  const [opciones, setOpciones] = useState(opcionesPorDefecto);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [activeKeys, setActiveKeys] = useState(Object.keys(opcionesPorDefecto));

  useEffect(() => {
    const fetchOpciones = async () => {
      try {
        setCargando(true);
        setError(null);
        const res = await fetch("http://localhost:5000/api/mascotas/filtros"); 
        if (!res.ok) throw new Error("Error al cargar filtros");
        const data = await res.json();

        setOpciones(data);
        setActiveKeys(Object.keys(data));
      } catch (e) {
        setError(e.message);
        // Dejo las opciones por defecto para que no se quede vacío
        setOpciones(opcionesPorDefecto);
      } finally {
        setCargando(false);
      }
    };

    fetchOpciones();
  }, []);

  const handleChange = (categoria, valor) => {
    const nuevosValores = filtros[categoria]?.includes(valor)
      ? filtros[categoria].filter((v) => v !== valor)
      : [...(filtros[categoria] || []), valor];
    setFiltros({ ...filtros, [categoria]: nuevosValores });
  };

  const limpiarFiltros = () => setFiltros({});

  const toggleAccordion = (key) => {
    if (activeKeys.includes(key)) {
      setActiveKeys(activeKeys.filter((k) => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };

  if (cargando)
    return (
      <div className="filtro-sidebar d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
        <Spinner animation="border" variant="secondary" />
      </div>
    );

  if (error)
    return (
      <div className="filtro-sidebar p-3 text-danger">
        <p>Error al cargar filtros: {error}</p>
        {/* Igual dejo la UI para que el usuario no quede varado */}
        <button onClick={() => setMostrarFiltros(!mostrarFiltros)} className="btn-toggle-filtros mb-3 w-100 d-flex justify-content-between align-items-center">
          Filtrar por <span>{mostrarFiltros ? "▲" : "▼"}</span>
        </button>
      </div>
    );

  return (
    <div className="filtro-sidebar">
      <button
        className="btn-toggle-filtros mb-3 w-100 d-flex justify-content-between align-items-center"
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      >
        Filtrar por
        <span>{mostrarFiltros ? "▲" : "▼"}</span>
      </button>

      {mostrarFiltros && (
        <Accordion activeKey={activeKeys}>
          {Object.entries(opciones).map(([categoria, valores], idx) => {
            const eventKey = idx.toString();
            const isActive = activeKeys.includes(eventKey);

            return (
              <Accordion.Item eventKey={eventKey} key={categoria} className="mb-2">
                <Accordion.Header
                  onClick={() => toggleAccordion(eventKey)}
                  className="text-capitalize d-flex justify-content-between align-items-center filtro-header"
                >
                  {traducciones[categoria] || categoria}
                  <span className="toggle-icon">
                    <i className={`bi ${isActive ? "bi-dash-square" : "bi-plus-square"}`}></i>
                  </span>
                </Accordion.Header>

                <Accordion.Body>
                  {valores.map((valor) => (
                    <Form.Check
                      key={valor}
                      type="checkbox"
                      id={`${categoria}-${valor}`}
                      label={valor}
                      checked={filtros[categoria]?.includes(valor) || false}
                      onChange={() => handleChange(categoria, valor)}
                      className="mb-2"
                    />
                  ))}
                  <Button variant="outline-secondary" className="mt-3 w-100" onClick={limpiarFiltros}>
                    Limpiar filtros
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default FiltroSidebar;
