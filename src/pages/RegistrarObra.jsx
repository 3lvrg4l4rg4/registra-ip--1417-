import React, { useState } from "react";

export default function RegistrarObra() {
  // 1. ESTADO ÚNICO CENTRALIZADO (Mantiene la información entre pasos)
  const [pasoActual, setPasoActual] = useState(1);
  const [formData, setFormData] = useState({
    // REGLA DE PERSONALIZACIÓN: Sustituye '1417' por los 4 últimos dígitos de tu boleta
    folio: "OBRA-1417-001",
    titulo: "",
    categoria: "",
    descripcion: "",
    autor: "",
    archivo: null,
  });

  const [cargando, setCargando] = useState(false);
  const [respuestaServidor, setRespuestaServidor] = useState(null);

  // Manejador genérico para inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejador específico para la selección de archivo (Paso 1)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, archivo: e.target.files[0] }));
    }
  };

  // 2. LÓGICA DE VALIDACIÓN POR PASO
  const esPasoValido = () => {
    switch (pasoActual) {
      case 1:
        // El Paso 1 requiere un archivo seleccionado
        return formData.archivo !== null;
      case 2:
        // El Paso 2 requiere título >= 5 caracteres y categoría seleccionada
        return (
          formData.titulo.trim().length >= 5 &&
          formData.categoria.trim() !== ""
        );
      case 3:
        // Vista previa (siempre válida para avanzar a confirmar)
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  // 3. NAVEGACIÓN
  const pasoSiguiente = () => {
    if (esPasoValido() && pasoActual < 4) {
      setPasoActual((prev) => prev + 1);
    }
  };

  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual((prev) => prev - 1);
    }
  };

  // 4. ENVÍO AL BACKEND (Paso 4)
  const handleSubmit = async () => {
    setCargando(true);

    // Creamos el objeto FormData exigido para envío de archivos y textos
    const data = new FormData();
    data.append("folio", formData.folio);
    data.append("titulo", formData.titulo);
    data.append("categoria", formData.categoria);
    data.append("descripcion", formData.descripcion);
    data.append("autor", formData.autor);
    data.append("archivo", formData.archivo); // Coincide con multer.single("archivo")

    try {
      const res = await fetch("http://localhost:4000/obras", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setRespuestaServidor(result);
      } else {
        alert(`Error al registrar: ${result.error}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor backend.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Wizard de Registro de Obra</h2>

      {/* --- BARRA DE PROGRESO VISUAL --- */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "2rem" }}>
        {[1, 2, 3, 4].map((num) => (
          <div key={num} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                backgroundColor: pasoActual >= num ? "#007bff" : "#ccc",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                margin: "0 auto",
              }}
            >
              {num}
            </div>
            <small style={{ fontSize: "0.8rem" }}>
              {num === 1 && "Archivo"}
              {num === 2 && "Metadatos"}
              {num === 3 && "Vista Previa"}
              {num === 4 && "Confirmación"}
            </small>
          </div>
        ))}
      </div>

      <hr />

      {/* --- CONTENIDO DINÁMICO SEGÚN EL PASO --- */}
      <div style={{ minHeight: "220px", padding: "1rem 0" }}>

        {/* PASO 1: SUBIR ARCHIVO */}
        {pasoActual === 1 && (
          <div>
            <h3>Paso 1: Subir Archivo de la Obra</h3>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Selecciona el archivo:
            </label>
            <input type="file" onChange={handleFileChange} />
            {formData.archivo && (
              <p style={{ color: "green", marginTop: "0.5rem" }}>
                Archivo seleccionado: <strong>{formData.archivo.name}</strong>
              </p>
            )}
          </div>
        )}

        {/* PASO 2: METADATOS */}
        {pasoActual === 2 && (
          <div>
            <h3>Paso 2: Metadatos de la Obra</h3>
            <div style={{ marginBottom: "1rem" }}>
              <label>Folio asignado:</label>
              <input
                type="text"
                name="folio"
                value={formData.folio}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.4rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Título (mínimo 5 caracteres): *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej. Interfaz Centrada en el Usuario"
                style={{ width: "100%", padding: "0.4rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Categoría: *</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                style={{ width: "100%", padding: "0.4rem" }}
              >
                <option value="">-- Selecciona una categoría --</option>
                <option value="Software">Software</option>
                <option value="Diseño UI/UX">Diseño UI/UX</option>
                <option value="Investigación">Investigación</option>
                <option value="Prototipo">Prototipo</option>
              </select>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Autor:</label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                style={{ width: "100%", padding: "0.4rem" }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="3"
                style={{ width: "100%", padding: "0.4rem" }}
              />
            </div>
          </div>
        )}

        {/* PASO 3: VISTA PREVIA */}
        {pasoActual === 3 && (
          <div>
            <h3>Paso 3: Vista Previa y Resumen</h3>
            <p>Revisa la información antes de guardar la obra:</p>
            <ul style={{ lineHeight: "1.8" }}>
              <li><strong>Folio:</strong> {formData.folio}</li>
              <li><strong>Título:</strong> {formData.titulo}</li>
              <li><strong>Categoría:</strong> {formData.categoria}</li>
              <li><strong>Autor:</strong> {formData.autor || "No especificado"}</li>
              <li><strong>Descripción:</strong> {formData.descripcion || "Sin descripción"}</li>
              <li>
                <strong>Archivo adjunto:</strong>{" "}
                {formData.archivo ? formData.archivo.name : "Ninguno"}
              </li>
            </ul>
          </div>
        )}

        {/* PASO 4: CONFIRMACIÓN Y ENVÍO */}
        {pasoActual === 4 && (
          <div>
            <h3>Paso 4: Confirmación Final</h3>
            {!respuestaServidor ? (
              <div>
                <p>Haz clic en <strong>Confirmar y Guardar</strong> para transmitir la información al servidor backend.</p>
                <button
                  onClick={handleSubmit}
                  disabled={cargando}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    borderRadius: "4px",
                    cursor: cargando ? "not-allowed" : "pointer",
                  }}
                >
                  {cargando ? "Enviando..." : "Confirmar y Guardar"}
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: "#d4edda", padding: "1rem", borderRadius: "5px", color: "#155724" }}>
                <h4>¡Obra registrada exitosamente!</h4>
                <p><strong>Folio asignado:</strong> {respuestaServidor.obra.folio}</p>
                <p><strong>Archivo subido:</strong> {respuestaServidor.obra.archivo.nombreOriginal}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <hr />

      {/* --- BOTONES DE NAVEGACIÓN (ATRÁS / SIGUIENTE) --- */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
        <button
          onClick={pasoAnterior}
          disabled={pasoActual === 1 || cargando}
          style={{ padding: "0.5rem 1rem", cursor: pasoActual === 1 ? "not-allowed" : "pointer" }}
        >
          Atrás
        </button>

        {pasoActual < 4 && (
          <button
            onClick={pasoSiguiente}
            disabled={!esPasoValido()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: esPasoValido() ? "#007bff" : "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: esPasoValido() ? "pointer" : "not-allowed",
            }}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}