import { db } from "../firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export const crearProducto = async (empresaId, producto) => {
  try {
    const docRef = await addDoc(collection(db, `empresas/${empresaId}/inventario`), producto);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const obtenerProductos = async (empresaId) => {
  try {
    const q = query(collection(db, `empresas/${empresaId}/inventario`));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};