import React from 'react'
import { Navigate } from 'react-router-dom';

export const AdoptionContent = () => {

      const handleNavigateToRegisterPet = () => {
        // Redirige a la ruta donde tienes el componente de registro de mascotas
        Navigate('/user/registro-mascota'); // Asegúrate que esta ruta coincida con la que definiste en App.js
      };
  return (
    <div className="adopciones-container"> {/* Puedes añadir un contenedor para estilos específicos */}
      <h1>Bienvenidos a la página de Adopciones</h1>
      <p>Aquí encontrarás a todos nuestros amigos peludos que están buscando un hogar para siempre.</p>
      {/* Aquí iría la lista de mascotas, filtros, etc. */}

      <div className="call-to-action mt-5"> {/* Agrega un poco de margen superior */}
        <h3>¿Quieres dar un hogar a una mascota?</h3>
        <p>Explora nuestras mascotas disponibles y encuentra a tu compañero ideal.</p>
        {/* Este botón podría llevar a una sección de la página o a otra página con las mascotas */}
        <button className="btn-primary me-3">Ver Mascotas en Adopción</button> {/* Usa tus clases CSS existentes */}

        <h3>¿Tienes una mascota que necesita un hogar?</h3>
        <p>Ayúdanos a encontrarle una familia registrándola en nuestra plataforma.</p>
        {/* Botón que te lleva al formulario de Registro de Mascota */}
        <button
          className="btn-primary" // Reutiliza tus estilos de botón
          onClick={handleNavigateToRegisterPet} // Al hacer clic, ejecuta la función de navegación
        >
          Registrar Mascota para Adopción
        </button>
      </div>

      {/* Esto se remueve ya que no queremos que aparezca el formulario directamente aquí */}
      {/* <RegistroMascotas /> */}
    </div>
  )
}
