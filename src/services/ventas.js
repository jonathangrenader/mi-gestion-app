// src/services/ventas.js
import { db } from "../firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export const crearVenta = async (empresaId, venta) => {
  try {
    const docRef = await addDoc(collection(db, `empresas/${empresaId}/ventas`), venta);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear venta:", error);
  }
};

export const obtenerVentas = async (empresaId) => {
  const q = query(collection(db, `empresas/${empresaId}/ventas`));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};