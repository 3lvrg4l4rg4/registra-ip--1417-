import { jsPDF } from "jspdf";
import QRCode from "qrcode";

/**
 * Función encargada de estructurar y descargar el certificado en PDF
 * @param {Object} obra - Objeto con la información de la obra registrada
 */
export const generarCertificado = async (obra) => {
  // Comprobación de recepción de datos (para depuración inicial)
  console.log("Datos recibidos para el certificado:", obra);

  // La lógica de generación se desarrollará en el Paso 3
};