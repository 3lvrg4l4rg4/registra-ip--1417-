import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // Recuperar los datos guardados durante el registro
  const datosGuardados = localStorage.getItem('registraIpUsuario');
  const usuario = datosGuardados ? JSON.parse(datosGuardados) : null;

  // Función para cerrar sesión
  const handleCerrarSesion = () => {
    // Eliminar la clave de sesión de localStorage
    localStorage.removeItem('registraIpUsuario');
    // Redirigir a la pantalla de registro
    navigate('/');
  };

  return (
    <div className="dashboard-card">
      {/* Saludo personalizado con el nombre del usuario */}
      <h2>¡Bienvenido, {usuario?.nombre || 'Creador'}! </h2>
      <p className="dashboard-subtitulo">
        Has ingresado exitosamente al panel del sistema <strong>REGISTRA-IP</strong>.
      </p>

      {/* Detalle del perfil registrado */}
      <div className="perfil-info">
        <h3>Datos de tu perfil</h3>
        <hr className="divider" />
        <p><strong>Nombre:</strong> {usuario?.nombre}</p>
        <p><strong>Correo:</strong> {usuario?.correo}</p>
        <p><strong>Tipo de creador:</strong> {usuario?.tipoCreador}</p>
      </div>

      {/* Botón para cerrar sesión */}
      <button 
        type="button" 
        onClick={handleCerrarSesion} 
        className="btn-logout"
      >
        Cerrar sesión
      </button>
    </div>
  );
}