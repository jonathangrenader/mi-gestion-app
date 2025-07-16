const functions = require("firebase-functions");
const Afip = require("@afipsdk/afip.js");
const admin = require("firebase-admin");

admin.initializeApp();

exports.generarFactura = functions.https.onCall(async (data, context) => {
  const { empresaId, clienteCuit, total, cliente } = data;
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Usuario no autenticado");
  }

  const cert = await admin.storage().bucket().file(`empresas/${empresaId}/certificados/cert.pem`).download();
  const key = await admin.storage().bucket().file(`empresas/${empresaId}/certificados/key.pem`).download();

  const afip = new Afip({
    CUIT: "TU_CUIT",
    cert: cert[0].toString(),
    key: key[0].toString(),
    production: false // Cambia a true para producción
  });

  const factura = {
    DocTipo: 80, // CUIT
    DocNro: clienteCuit,
    ImpTotal: total,
    Concepto: 1, // Productos
    CbteTipo: 1, // Factura A
    // Otros campos requeridos por AFIP
  };

  try {
    const response = await afip.ElectronicBilling.createNextVoucher(factura);
    return {
      cae: response.CAE,
      vencimientoCae: response.CAEFchVto
    };
  } catch (error) {
    throw new functions.https.HttpsError("internal", "Error al generar factura: " + error.message);
  }
});