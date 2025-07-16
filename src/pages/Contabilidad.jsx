import { useState, useEffect } from "react";
import { crearAsiento, obtenerAsientos } from "../services/contabilidad";
import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { TextField, Button, TableContainer, Paper } from "@mui/material";
import DataTable from "../components/DataTable";
import EmpresaSelector from "../components/EmpresaSelector";

function Contabilidad() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const [asientos, setAsientos] = useState([]);
  const [asiento, setAsiento] = useState({
    descripcion: "",
    fecha: new Date().toISOString().slice(0, 10),
    debe: 0,
    haber: 0,
  });

  useEffect(() => {
    if (empresaActiva) {
      const fetchAsientos = async () => {
        const asientosData = await obtenerAsientos(empresaActiva.id);
        setAsientos(asientosData);
      };
      fetchAsientos();
    }
  }, [empresaActiva]);

  const handleSubmit = async () => {
    if (!empresaActiva) return alert("Selecciona una empresa");
    if (asiento.debe !== asiento.haber) return alert("El debe y el haber deben ser iguales");
    await crearAsiento(empresaActiva.id, asiento);
    setAsiento({ descripcion: "", fecha: new Date().toISOString().slice(0, 10), debe: 0, haber: 0 });
    const asientosData = await obtenerAsientos(empresaActiva.id);
    setAsientos(asientosData);
  };

  const columns = [
    { id: "descripcion", label: "Descripción" },
    { id: "fecha", label: "Fecha" },
    { id: "debe", label: "Debe" },
    { id: "haber", label: "Haber" },
  ];

  return (
    <div>
      <h2>Gestión de Contabilidad</h2>
      <EmpresaSelector />
      <TextField
        label="Descripción"
        value={asiento.descripcion}
        onChange={(e) => setAsiento({ ...asiento, descripcion: e.target.value })}
      />
      <TextField
        label="Debe"
        type="number"
        value={asiento.debe}
        onChange={(e) => setAsiento({ ...asiento, debe: Number(e.target.value) })}
      />
      <TextField
        label="Haber"
        type="number"
        value={asiento.haber}
        onChange={(e) => setAsiento({ ...asiento, haber: Number(e.target.value) })}
      />
      <Button onClick={handleSubmit}>Registrar Asiento</Button>
      <TableContainer component={Paper}>
        <DataTable columns={columns} rows={asientos} />
      </TableContainer>
    </div>
  );
}

export default Contabilidad;