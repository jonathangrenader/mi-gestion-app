import firebase from "firebase/compat/app";
import "firebase/compat/functions";

export const generarFactura = async (empresaId, facturaData) => {
  const functions = firebase.functions();
  const generarFacturaFunction = functions.httpsCallable("generarFactura");

  try {
    const result = await generarFacturaFunction({ empresaId, ...facturaData });
    return result.data;
  } catch (error) {
    console.error("Error al generar factura:", error);
    throw error;
  }
};

export const verificarSuscripcionAFIP = async (userId) => {
  const functions = firebase.functions();
  const verificarSuscripcion = functions.httpsCallable("verificarSuscripcion");

  try {
    const result = await verificarSuscripcion({ userId });
    return result.data.plan !== "Gratuita";
  } catch (error) {
    console.error("Error al verificar suscripción para AFIP:", error);
    throw error;
  }
};