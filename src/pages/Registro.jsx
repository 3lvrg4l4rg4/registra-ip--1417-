import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registro() {
  const navigate = useNavigate();

  // 1. Estado para almacenar los valores de los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    tipoCreador: ''
  });

  // 2. Estado para almacenar los mensajes de error
  const [error, setError] = useState('');

  // Manejador para actualizar el estado conforme el usuario escribe o selecciona
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Función de validación del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    const { nombre, correo, tipoCreador } = formData;

    // Validación 1: Campos obligatorios no vacíos
    if (!nombre.trim() || !correo.trim() || !tipoCreador) {
      setError('Todos los campos son obligatorios. Por favor, completa la información.');
      return;
    }

    // Validación 2: Formato de correo electrónico válido
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(correo)) {
      setError('Por favor, ingresa un correo electrónico con formato válido (ejemplo@dominio.com).');
      return;
    }

    // Al superar las validaciones: guardar datos en localStorage
    const datosCreador = {
      nombre: nombre.trim(),
      correo: correo.trim(),
      tipoCreador: tipoCreador
    };

    localStorage.setItem('registraIpUsuario', JSON.stringify(datosCreador));

    // Redirigir al usuario hacia la ruta del Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="registro-card">
      <h2>Registro de Creador</h2>
      <p className="registro-instrucciones">
        Completa el formulario para registrarte en la plataforma "REGISTRA-IP".
      </p>

      {/* 3. Contenedor de errores accesible con aria-live="polite" */}
      <div 
        aria-live="polite" 
        className={`mensaje-error ${error ? 'visible' : ''}`}
      >
        {error && <p>{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="formulario-registro" noValidate>
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Carlos Mendoza"
          />
        </div>

        {/* Campo Correo */}
        <div className="form-group">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@ipn.mx"
          />
        </div>

        {/* Campo Tipo de Creador (select) */}
        <div className="form-group">
          <label htmlFor="tipoCreador">Tipo de creador:</label>
          <select
            id="tipoCreador"
            name="tipoCreador"
            value={formData.tipoCreador}
            onChange={handleChange}
          >
            <option value="">-- Selecciona una opción --</option>
            <option value="Diseñador">Diseñador</option>
            <option value="Fotógrafo">Fotógrafo</option>
            <option value="Escritor">Escritor</option>
            <option value="Cineasta">Cineasta</option>
          </select>
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn-registro">
          Registrar Creador
        </button>
      </form>
    </div>
  );
}