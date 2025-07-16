import { db } from "../firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export const crearCompra = async (empresaId, compra) => {
  try {
    const docRef = await addDoc(collection(db, `empresas/${empresaId}/compras`), compra);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear compra:", error);
    throw error;
  }
};

export const obtenerCompras = async (empresaId) => {
  try {
    const q = query(collection(db, `empresas/${empresaId}/compras`));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener compras:", error);
    throw error;
  }
};