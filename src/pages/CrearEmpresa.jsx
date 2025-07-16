import { useState } from "react";
import { crearEmpresa } from "../services/empresas";
import { useAuth } from "../context/AuthContext";
import { TextField, Button } from "@mui/material";

function CrearEmpresa() {
  const { user } = useAuth();
  const [empresa, setEmpresa] = useState({ nombre: "", cuit: "" });

  const handleSubmit = async () => {
    await crearEmpresa(user.uid, empresa);
    alert("Empresa creada!");
    setEmpresa({ nombre: "", cuit: "" });
  };

  return (
    <div>
      <h2>Crear Empresa</h2>
      <TextField
        label="Nombre"
        value={empresa.nombre}
        onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
      />
      <TextField
        label="CUIT"
        value={empresa.cuit}
        onChange={(e) => setEmpresa({ ...empresa, cuit: e.target.value })}
      />
      <Button onClick={handleSubmit}>Crear Empresa</Button>
    </div>
  );
}

export default CrearEmpresa;