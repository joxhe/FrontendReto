// src/services/authService.js

const API_BASE_URL = 'http://localhost:3000/v1';

class AuthService {
  
  // Método para login
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = await response.json();

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        return {
          success: false,
          error: data.message || `Error ${response.status}: ${response.statusText}`,
          message: data.message || 'Error al iniciar sesión'
        };
      }

      // Si el login es exitoso y hay un rol, guardarlo en sessionStorage
      if (data.rol) {
        this.setUserRole(data.rol);
        this.setUserData(username, data.rol);
        
        return {
          success: true,
          data: {
            username: username,
            rol: data.rol
          },
          message: 'Login exitoso'
        };
      } else {
        return {
          success: false,
          error: 'Respuesta inválida del servidor',
          message: 'Error al iniciar sesión'
        };
      }
      
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: error.message,
        message: 'Error de conexión. Verifica tu conexión a internet.'
      };
    }
  }



  // Método para logout
  logout() {
    // Limpiar datos del sessionStorage
    this.removeUserData();
    return {
      success: true,
      message: 'Sesión cerrada correctamente'
    };
  }

  // Métodos para manejar el rol y datos del usuario en sessionStorage
  setUserRole(rol) {
    sessionStorage.setItem('userRole', rol);
  }

  setUserData(username, rol) {
    const userData = {
      username: username,
      rol: rol,
      loginTime: new Date().toISOString()
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    sessionStorage.setItem('username', username); // Para acceso directo
  }

  getUserRole() {
    return sessionStorage.getItem('userRole');
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserData() {
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  removeUserData() {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userData');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    const userRole = this.getUserRole();
    const userData = this.getUserData();
    return !!(userRole && userData);
  }

  // Verificar si el usuario tiene un rol específico
  hasRole(requiredRole) {
    const userRole = this.getUserRole();
    return userRole === requiredRole;
  }

  // Verificar si el usuario es admin
  isAdmin() {
    return this.hasRole('admin');
  }

  // Verificar si el usuario es usuario normal
  isUser() {
    return this.hasRole('usuario');
  }

  // Obtener información completa del usuario actual
  getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }
    
    return this.getUserData();
  }
}

// Crear y exportar una instancia del servicio
const authService = new AuthService();
export default authService;