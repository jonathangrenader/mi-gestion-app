import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const EmpresaContext = createContext();

export function EmpresaProvider({ children }) {
  const { user } = useAuth();
  const [empresas, setEmpresas] = useState([]);
  const [empresaActiva, setEmpresaActiva] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchEmpresas = async () => {
        const querySnapshot = await getDocs(collection(db, `users/${user.uid}/empresas`));
        const empresasData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmpresas(empresasData);
        if (empresasData.length > 0) {
          setEmpresaActiva(empresasData[0]); // Selecciona la primera empresa por defecto
        }
        setLoading(false);
      };
      fetchEmpresas();
    }
  }, [user]);

  return (
    <EmpresaContext.Provider value={{ empresas, empresaActiva, setEmpresaActiva, loading }}>
      {children}
    </EmpresaContext.Provider>
  );
}

export const useEmpresa = () => useContext(EmpresaContext);