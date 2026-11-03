import { jsPDF } from "jspdf";
import QRCode from "qrcode";

/**
 * Genera y descarga un certificado de registro en PDF para una obra individual.
 */
export const generarCertificado = async (obra, miNombre = "Tu Nombre Completo") => {
  try {
    // 1. Instanciar documento PDF en orientación Horizontal (A4)
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // 2. Generar el código QR desde el folio de la obra
    const qrDataUrl = await QRCode.toDataURL(obra?.folio || "OBRA-0000", {
      margin: 1,
      width: 250,
    });

    // 3. Diseñar Marco Decorativo (Marco doble exterior)
    doc.setLineWidth(1.5);
    doc.setDrawColor(40, 40, 40);
    doc.rect(10, 10, 277, 190);

    doc.setLineWidth(0.5);
    doc.rect(13, 13, 271, 184);

    // 4. Encabezados Principales
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(20, 20, 20);
    doc.text("CERTIFICADO DE REGISTRO DE AUTORÍA", 148.5, 35, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("INSTITUTO POLITÉCNICO NACIONAL - UPIICSA", 148.5, 43, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(180, 180, 180);
    doc.line(35, 48, 262, 48);

    doc.setFontSize(13);
    doc.setTextColor(60, 60, 60);
    doc.text("Por medio del presente documento se hace constar el registro oficial de la obra:", 148.5, 60, { align: "center" });

    // 5. Datos de la Obra
    const startX = 35;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("TÍTULO DE LA OBRA:", startX, 78);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(`"${obra?.titulo || 'Sin Título'}"`, startX, 86);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("AUTOR(A):", startX, 100);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    doc.setTextColor(30, 30, 30);
    doc.text(obra?.autor || "Autor no especificado", startX, 108);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("FECHA DE REGISTRO:", startX, 122);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.setTextColor(30, 30, 30);
    doc.text(obra?.fecha || new Date().toLocaleDateString(), startX, 130);

    // 6. Datos de Personalización y Control
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(120, 120, 120);
    doc.text("FOLIO DE REGISTRO:", startX, 147);

    doc.setFont("courier", "bold");
    doc.setFontSize(13);
    doc.setTextColor(0, 51, 102);
    doc.text(obra?.folio || "OBRA-0000", startX, 155);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(`Registrado por: ${miNombre}`, startX, 168);

    // 7. Insertar Código QR
    doc.addImage(qrDataUrl, "PNG", 215, 125, 45, 45);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("Escanea para validar folio", 237.5, 174, { align: "center" });

    // 8. Descargar PDF
    doc.save(`certificado-${obra?.folio || "registro"}.pdf`);

  } catch (error) {
    console.error("Error al generar el certificado PDF:", error);
    alert("Ocurrió un error al intentar generar el certificado.");
  }
};