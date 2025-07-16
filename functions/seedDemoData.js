const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

async function seedDemoData() {
  // Empresa DEMO
  await db.collection("empresas").doc("demo").set({
    nombre: "Empresa Demo SRL",
    cuit: "20-11111111-2",
    plan: "Gratuita",
    maxFacturas: 50,
    facturasEmitidas: 0
  });

  // Usuario DEMO
  await db.collection("empresas").doc("demo").collection("usuarios").doc("demoUser").set({
    email: "demo@empresa.com",
    rol: "admin",
    nombre: "Usuario Demo"
  });

  // Ventas DEMO
  await db.collection("empresas").doc("demo").collection("ventas").doc("venta1").set({
    cliente: "Cliente Ejemplo",
    cuit: "20111111112",
    total: 1000,
    fecha: "2025-07-15",
    estado: "pendiente"
  });
  await db.collection("empresas").doc("demo").collection("ventas").doc("venta2").set({
    cliente: "Cliente Prueba",
    cuit: "20222222222",
    total: 2500,
    fecha: "2025-07-14",
    estado: "completada"
  });

  // Inventario DEMO
  await db.collection("empresas").doc("demo").collection("inventario").doc("producto1").set({
    nombre: "Producto A",
    stock: 100,
    precio: 500
  });
  await db.collection("empresas").doc("demo").collection("inventario").doc("producto2").set({
    nombre: "Producto B",
    stock: 50,
    precio: 750
  });

  console.log("Datos DEMO creados con éxito");
}

seedDemoData().catch(console.error);