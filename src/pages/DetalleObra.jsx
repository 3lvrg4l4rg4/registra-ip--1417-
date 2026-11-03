import React, { useState } from "react";
import { generarCertificado } from "../utils/generarCertificado";

export const DetalleObra = ({ obra }) => {
  const [generando, setGenerando] = useState(false);

  // Validación si aún no se ha cargado la información de la obra
  if (!obra) {
    return <p>Selecciona una obra registrada para ver sus detalles.</p>;
  }

  // Manejador del evento de clic en el botón
  const handleDescargarCertificado = async () => {
    setGenerando(true);
    try {
      // Sustituye "Tu Nombre Completo" por tu nombre real para cumplir la personalización obligatoria
      await generarCertificado(obra, "Tu Nombre Completo");
    } catch (error) {
      console.error("Error al generar el certificado:", error);
      alert("No se pudo generar el archivo PDF.");
    } finally {
      setGenerando(false);
    }
  };

  return (
    <div className="detalle-obra-container" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Vista de Detalle de la Obra</h2>
      
      {/* Visualización de metadatos de la obra individual */}
      <div className="metadatos">
        <p><strong>Título de la obra:</strong> {obra.titulo}</p>
        <p><strong>Autor original:</strong> {obra.autor}</p>
        <p><strong>Fecha de registro:</strong> {obra.fecha}</p>
        <p><strong>Folio asignado:</strong> <code>{obra.folio}</code></p>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Botón obligatorio para detonar la descarga del PDF */}
      <button
        onClick={handleDescargarCertificado}
        disabled={generando}
        style={{
          padding: "10px 20px",
          backgroundColor: generando ? "#999999" : "#003366",
          color: "#ffffff",
          border: "none",
          borderRadius: "4px",
          cursor: generando ? "not-allowed" : "pointer",
          fontWeight: "bold"
        }}
      >
        {generando ? "Generando PDF..." : "Descargar certificado"}
      </button>
    </div>
  );
};

export default DetalleObra;