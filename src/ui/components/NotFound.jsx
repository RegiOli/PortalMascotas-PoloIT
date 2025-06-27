
import { useNavigate } from "react-router-dom";
import "../styles/notFound.css";

export const NotFound = ()=> {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>¡Ups! Esta patita se perdió 🐾</h2>
        <p>No pudimos encontrar la página que estás buscando.</p>
        <button onClick={() => navigate("/")}>Volver al inicio</button>
      </div>
    </div>
  );
}