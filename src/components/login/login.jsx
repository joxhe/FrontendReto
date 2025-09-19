import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import authService from "../../services/authService";
import imgDecorativa from "./decorativa.png";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.username || !formData.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Llamar al servicio de login
      const result = await authService.login(formData.username, formData.password);
      
      if (result.success) {
        console.log('Login exitoso:', result.data);
        
        // Redirigir al dashboard después del login exitoso
        navigate('/dashboard');
        
      } else {
        // Mostrar error devuelto por la API
        setError(result.error || 'Error al iniciar sesión');
      }
      
    } catch (error) {
      console.error('Error inesperado:', error);
      setError('Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

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
          
          {/* Mostrar error si existe */}
          {error && (
            <div style={{ 
              color: '#ff6b6b', 
              backgroundColor: '#ffe0e0', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Nombre de usuario</label>
            <input 
              type="text" 
              name="username"
              placeholder="Ingresa tu nombre de usuario" 
              value={formData.username}
              onChange={handleInputChange}
              disabled={loading}
            />

            <label>Contraseña</label>
            <input 
              type="password" 
              name="password"
              placeholder="Ingresa tu contraseña" 
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />

            <div className="login-options">
              <label>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                /> 
                Recuérdame
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>
          </form>
          
          {/* Enlace de registro */}
          <div className="register-link">
            ¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;