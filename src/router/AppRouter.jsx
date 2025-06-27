import { Routes, Route } from "react-router-dom";
import { Login, Registro, RecuperarContrasenia } from "../Auth";
// import { PrivateRoute } from "../components";
// import { useSelector } from "react-redux";
// import { MainRouter } from "../Main/routes";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Home } from "../Home/page/Home";
import { Nosotros } from "../Nosotros/pages/Nosotros";
import { Donaciones } from "../Donaciones/pages/Donaciones";
import { Adopciones } from "../Adopciones/pages/Adopciones";
import { Contacto } from "../Contacto/pages/Contacto";
import Jornadas from "../Jornadas/pages/Jornadas";
import { Footer, Header, NotFound } from "../ui";
import { UserRouter } from "../User";

export const AppRouter = ()=> {
  const {checkAuthToken, status} = useAuthStore();
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    checkAuthToken()
  }, [])
  

  return (
    <>
      <Header isAuthenticated={isAuthenticated}/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/donaciones" element={<Donaciones />} />
          <Route path="/adopciones" element={<Adopciones />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/jornadas" element={<Jornadas />} />
          {
            isAuthenticated&&(
              <Route path="/user/*" element={<UserRouter/>} />
            )
          }

          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperar" element={<RecuperarContrasenia />} />

            </>
          )}

          <Route path="/*" element={<NotFound />} />
         
        </Routes>
      </main>
      <Footer />
    </>
  );
}








//  <Route
//             path="/admin/dashboard"
//             element={
//               <PrivateRoute rolesAllowed={['user']}>
//                 <div><h2>Panel de Admin</h2></div>
//               </PrivateRoute>
//             }
//           />