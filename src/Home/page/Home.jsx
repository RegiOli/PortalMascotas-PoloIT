import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import FiltroSidebar from "../components/FiltroSidebar";
import { usePetsStore } from "../../hooks/usePetStore";
import "../styles/home.css";

export const Home = () => {
  const [filtros, setFiltros] = useState({});
  const [paginaActual, setPaginaActual] = useState(1);

  const { pets, totalPages, isLoading, startLoadingPets } = usePetsStore();

  useEffect(() => {
    startLoadingPets(filtros, paginaActual);
  }, [filtros, paginaActual]);

  return (
    <div className="home">
      <section className="home-hero"></section>

      <section className="home-acciones">
        <button className="btn-voluntariado">VOLUNTARIADO</button>
        <button className="btn-transito">QUIERO SER HOGAR DE TRÁNSITO</button>
      </section>

      <section className="home-nosotros">
        <div className="nosotros-wrapper">
          <img src="/corazonAmor.png" alt="Adoptar es un acto de amor" className="nosotros-corazon" />
          <div className="nosotros-caja">
            <h2>NOSOTROS</h2>
            <p>
              Somos un equipo de personas impulsadas por el amor, el cariño y la
              empatía hacia las mascotas...
            </p>
          </div>
        </div>
      </section>

      <div className="container-fluid">
        <div className="row">
          <aside className="col-md-3">
            <FiltroSidebar filtros={filtros} setFiltros={setFiltros} />
          </aside>
          <main className="col-md-9">
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading ? (
                <p>Cargando mascotas...</p>
              ) : (
                pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
              )}
            </div>

            <nav className="d-flex justify-content-center my-4">
              <ul className="pagination custom-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${paginaActual === i + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
};
