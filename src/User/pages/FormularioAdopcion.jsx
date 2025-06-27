import '../styles/formulario-adopcion.css';

export const FormularioAdopcion = ()=> {
  return (
    <div className="adopcion-wrapper">
      <div className="glass-card">
        <h1 className="adopcion-titulo">Formulario de Adopción</h1>
        <p className="adopcion-texto">
          Para iniciar el proceso de adopción, por favor completá el siguiente formulario.
        </p>
        <a
          href="https://forms.gle/tu-formulario-aqui"
          target="_blank"
          rel="noopener noreferrer"
          className="adopcion-boton"
        >
          Ir al Formulario 📝
        </a>
      </div>
    </div>
  );
}

