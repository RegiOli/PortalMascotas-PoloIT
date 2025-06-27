import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../../components/admin/Dashboard";
import Solicitudes from "../../components/admin/Solicitudes";
import Mascotas from "../../components/admin/Mascotas";

const AdminPage = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Menu lateral */}
      <nav style={{ width: "200px", padding: "1rem", backgroundColor: "#eee" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/solicitudes">Solicitudes</Link></li>
          <li><Link to="/admin/mascotas">Mascotas</Link></li>
        </ul>
      </nav>

      {/* Contenido */}
      <div style={{ flexGrow: 1, padding: "1rem" }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="mascotas" element={<Mascotas />} />
          {/* Ruta default si no pone nada */}
          <Route path="" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
