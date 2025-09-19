import "./Register.css";
import imgDecorativa2 from "./decorativa2.jpg"; // tu segunda imagen
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="register-container">
      <div className="register-box">
        {/* Parte izquierda con la imagen */}
        <div className="register-image">
          <img src={imgDecorativa2} alt="Decoración" />
        </div>

        {/* Parte derecha con el formulario */}
        <div className="register-form">
          <h2>Crea tu cuenta</h2>
          <form>
            <label>Nombre completo</label>
            <input type="text" placeholder="Ingresa tu nombre completo" />

            <label>Correo electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" />

            <label>Contraseña</label>
            <input type="password" placeholder="Crea una contraseña" />

            <button type="submit">Registrarse</button>
          </form>
          
          {/* Enlace de login */}
          <div className="login-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;