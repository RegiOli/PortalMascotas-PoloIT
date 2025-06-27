import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "./../styles/PetCard.css";

const PetCard = ({ pet }) => {
  const { nombre, edad, sexo, tamanio, info_adicional, estado, imagen_url } =
    pet;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const estadoConfig = {
    Adoptado: {
      color: "#E2574C",
      icon: "❤️",
    },
    "En Adopción": {
      color: "#F4A525",
      icon: "💛",
    },
  };
  const handleShare = () => {
    const shareData = {
      title: `Conocé a ${nombre}`,
      text: `${nombre} es un/a ${sexo} de ${edad}. Tamaño: ${tamanio}. ${info_adicional}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Compartido con éxito"))
        .catch((err) => console.error("Error al compartir", err));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
  };

  return (
    <Card className="pet-card shadow rounded-4 m-2">
      <div
        className="estado-header d-flex justify-content-between align-items-center px-3 py-3"
        style={{ backgroundColor: estadoConfig[estado]?.color || "#D9B391" }}
      >
        <span>{estadoConfig[estado]?.icon}</span>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-heart-fill heart-icon-estado"></i>
          <strong>{estado}</strong>
        </div>
        <span>
          <Button variant="light" className="icon-btn" onClick={handleShare}>
            <i className="bi bi-share-fill"></i>
          </Button>
        </span>
      </div>

      <Card.Img variant="top" src={imagen_url} className="pet-img" />

      <Card.Body className="text-center">
        <h5 className="fw-bold">{nombre}</h5>
        <p>
          <strong>Edad:</strong> {edad}
        </p>
        <p>
          <strong>Sexo:</strong> {sexo}
        </p>
        <p>
          <strong>Tamaño:</strong> {tamanio}
        </p>

        <p className="info_adicional text-muted small">
          {info_adicional?.slice(0, 10)}...
          <span className="ver-mas" onClick={handleShow}>
            Ver más
          </span>
        </p>

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{nombre}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <img
              src={imagen_url}
              alt={nombre}
              className="img-fluid rounded mb-3"
            />
            <p>
              <strong>Edad:</strong> {edad}
            </p>
            <p>
              <strong>Sexo:</strong> {sexo}
            </p>
            <p>
              <strong>Tamaño:</strong> {tamanio}
            </p>
            <p>
              <strong>Descripción:</strong> {info_adicional}
            </p>

            <Button className="icon-btn" onClick={handleShare}>
              <i className="bi bi-share-fill me-2"></i>Compartir
            </Button>
          </Modal.Body>
        </Modal>

        <div className="d-flex justify-content-around align-items-center gap-3 my-3 flex-wrap">
          <Button variant="light" className="btn-marron" size="sm">
            Adoptar
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-suit-heart"></i>
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-wechat"></i>
          </Button>

          <Button variant="light" className="icon-btn">
            <i className="bi bi-bookmark"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
