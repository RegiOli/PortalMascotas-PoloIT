import { Route, Routes } from 'react-router-dom';
import {MisPublicaciones, Configuracion, AspectosSistema,PublicarMascota, MiCuenta, MiPerfil, FormularioAdopcion} from '../pages';
import { NotFound } from '../../ui';
export const UserRouter = () => {
  return (
        <Routes>
            <Route path="/mis-publicaciones" element={<MisPublicaciones />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="/aspectos-del-sistema" element={<AspectosSistema />} />
            <Route path="/publicar" element={<PublicarMascota />} />
            <Route path="/mi-cuenta" element={<MiCuenta />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/formulario-adopcion" element={<FormularioAdopcion />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
  )
}
