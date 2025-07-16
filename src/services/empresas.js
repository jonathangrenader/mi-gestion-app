import { db } from "../firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

export const crearEmpresa = async (userId, empresaData) => {
  try {
    const empresaRef = await addDoc(collection(db, "empresas"), {
      nombre: empresaData.nombre,
      cuit: empresaData.cuit,
    });
    await setDoc(doc(db, `users/${userId}/empresas`, empresaRef.id), {
      role: "admin",
      nombre: empresaData.nombre,
      cuit: empresaData.cuit,
    });
    await setDoc(doc(db, `empresas/${empresaRef.id}/usuarios`, userId), {
      role: "admin",
    });
    return empresaRef.id;
  } catch (error) {
    console.error("Error al crear empresa:", error);
  }
};