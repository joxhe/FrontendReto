import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay datos de sesión
    const storedUsername = sessionStorage.getItem('username');
    const storedRole = sessionStorage.getItem('userRole');

    if (!storedUsername || !storedRole) {
      // Si no hay sesión, redirigir al login
      navigate('/login');
      return;
    }

    setUsername(storedUsername);
    setUserRole(storedRole);
  }, [navigate]);

  const handleLogout = () => {
    // Limpiar sessionStorage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userData');
    
    // Redirigir al login
    navigate('/login');
  };

  const handleFileUpload = (uploadedFiles) => {
    // Por ahora solo simulamos la subida de archivos
    const newFiles = Array.from(uploadedFiles).map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toLocaleString(),
      status: 'Subido'
    }));
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFileUpload(selectedFiles);
    }
  };

  // Funciones para drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>¡Bienvenido, {username}!</h1>
            <span className="user-role">Rol: {userRole}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Upload Section */}
        <section className="upload-section">
          <h2>Subir Archivos</h2>
          
          {/* Drag and Drop Area */}
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">📁</div>
              <p>Arrastra archivos aquí o</p>
              <label htmlFor="file-input" className="upload-btn">
                Seleccionar Archivos
              </label>
              <input
                id="file-input"
                type="file"
                multiple
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </section>

        {/* Files List Section */}
        <section className="files-section">
          <div className="files-header">
            <h2>Archivos</h2>
            <span className="files-count">({files.length} archivos)</span>
          </div>

          {files.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>No hay archivos</h3>
              <p>Sube tu primer archivo usando el área de arriba</p>
            </div>
          ) : (
            <div className="files-list">
              {files.map(file => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <div className="file-icon">
                      {file.type.startsWith('image/') ? '🖼️' : 
                       file.type.startsWith('video/') ? '🎥' : 
                       file.type.includes('pdf') ? '📄' : 
                       file.type.includes('document') ? '📝' : '📎'}
                    </div>
                    <div className="file-details">
                      <h4 className="file-name">{file.name}</h4>
                      <div className="file-meta">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <span>{file.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="file-actions">
                    <span className="file-status">{file.status}</span>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="remove-btn"
                      title="Eliminar archivo"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;