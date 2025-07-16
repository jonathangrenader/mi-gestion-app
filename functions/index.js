const functions = require("firebase-functions");
const afip = require("./afip");
const suscripciones = require("./suscripciones");

exports.generarFactura = afip.generarFactura;
exports.verificarSuscripcion = suscripciones.verificarSuscripcion;