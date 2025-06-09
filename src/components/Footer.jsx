import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; 
import '../estilos/footer.css';

function Footer() {
  return (
    <!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Footer Estilo Redes Sociales</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }

        .footer {
            background-color: #d9ab86;
            /* color beige */
            color: #5a2800;
            /* color marrón */
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            padding: 40px 20px;
            flex-wrap: wrap;
        }

        .footer-section {
            margin: 10px;
        }

        .footer-section h3,
        .footer-section p,
        .footer-section a {
            margin: 10px 0;
            text-decoration: none;
            color: #5a2800;
        }

        .social-icons img {
            width: 36px;
            margin-right: 10px;
            vertical-align: middle;
        }

        .links a {
            display: block;
            margin: 6px 0;
            font-weight: bold;
        }

        .newsletter {
            background: white;
            border-radius: 20px;
            padding: 20px;
            border: 2px solid #5a2800;
            max-width: 300px;
            box-sizing: border-box;
        }

        .newsletter h3 {
            margin-top: 0;
            color: #5a2800;
        }


        .newsletter input[type="email"],
        .newsletter button {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            /* separación inferior uniforme */
            border-radius: 10px;
            font-size: 16px;
            display: block;
            text-align: center;
        }

        .newsletter input[type="email"] {
            border: 1px solid #ccc;


        }

        .newsletter button {
            background-color: #c76575;
            color: white;
            font-weight: bold;
            border: none;
            cursor: pointer;
        }

        .newsletter button:hover {
            background-color: #a74e5f;
        }
    </style>
</head>

<body>

    <footer class="footer">

        <!-- Redes Sociales -->
        <div class="footer-section social">
            <p style="text-align: center;"><strong>¡Te esperamos en nuestras<br>Redes Sociales!</strong></p>
            <div class="social-icons">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023.svg" alt="X">
            </div>
        </div>

        <!-- Enlaces -->
        <div class="footer-section links">
            <a href="#">Nosotros</a>
            <a href="#">Jornadas</a>
            <a href="#">Donaciones</a>
            <a href="#">Contacto</a>
        </div>

        <!-- Novedades -->
        <div class="newsletter">
            <h3 style="text-align: center;">¡Recibe las novedades en tu correo!</h3>
            <input type="email" placeholder="Ingresa tu correo">
            <button>¡SUSCRIBIRME!</button>
        </div>

        <!-- Leyenda Final-->
        <div className="footer-bottom">
            <p style="text-align: center;"> <i>Portal de Mascotas 🐾 - Todos los derechos reservados.</i></p>
            <p style="text-align: center;"><i>Hecho con ❤️ para los amantes de las mascotas</i></p>
        </div>



    </footer>

</body>

</html>


export default Footer;
