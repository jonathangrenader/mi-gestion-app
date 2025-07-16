import jsPDF from "jspdf";
import { obtenerVentas } from "./ventas";

export const generarReporteVentas = async (empresaId) => {
  const ventas = await obtenerVentas(empresaId);
  const doc = new jsPDF();
  doc.text("Reporte de Ventas", 10, 10);
  ventas.forEach((venta, index) => {
    doc.text(
      `${index + 1}. Cliente: ${venta.cliente} - Total: $${venta.total} - CAE: ${venta.cae || "N/A"}`,
      10,
      20 + index * 10
    );
  });
  doc.save("reporte_ventas.pdf");
};