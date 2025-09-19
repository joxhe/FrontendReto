import "./Login.css";
import imgDecorativa from "./decorativa.png"; // pon aquí tu imagen local

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Parte izquierda con la imagen */}
        <div className="login-image">
          <img src={imgDecorativa} alt="Decoración" />
        </div>

        {/* Parte derecha con el formulario */}
        <div className="login-form">
          <h2>Inicia sesión en tu cuenta</h2>
          <form>
            <label>Correo electrónico</label>
            <input type="email" placeholder="Ingresa tu correo" />

            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />

            <div className="login-options">
              <label>
                <input type="checkbox" /> Recuérdame
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit">Ingresar</button>
          </form>
          
          {/* Enlace de registro */}
          <div className="register-link">
            ¿Aún no tienes cuenta? <a href="#">Regístrate</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;