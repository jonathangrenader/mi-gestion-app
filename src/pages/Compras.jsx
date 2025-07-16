import { useState, useEffect } from "react";
import { crearCompra, obtenerCompras } from "../services/compras";
import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { TextField, Button, TableContainer, Paper } from "@mui/material";
import DataTable from "../components/DataTable";
import EmpresaSelector from "../components/EmpresaSelector";

function Compras() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const [compras, setCompras] = useState([]);
  const [compra, setCompra] = useState({
    proveedor: "",
    fecha: new Date().toISOString().slice(0, 10),
    total: 0,
    items: [],
  });

  useEffect(() => {
    if (empresaActiva) {
      const fetchCompras = async () => {
        const comprasData = await obtenerCompras(empresaActiva.id);
        setCompras(comprasData);
      };
      fetchCompras();
    }
  }, [empresaActiva]);

  const handleSubmit = async () => {
    if (!empresaActiva) return alert("Selecciona una empresa");
    await crearCompra(empresaActiva.id, compra);
    setCompra({ proveedor: "", fecha: new Date().toISOString().slice(0, 10), total: 0, items: [] });
    const comprasData = await obtenerCompras(empresaActiva.id);
    setCompras(comprasData);
  };

  const columns = [
    { id: "proveedor", label: "Proveedor" },
    { id: "fecha", label: "Fecha" },
    { id: "total", label: "Total" },
  ];

  return (
    <div>
      <h2>Registrar Compra</h2>
      <EmpresaSelector />
      <TextField
        label="Proveedor"
        value={compra.proveedor}
        onChange={(e) => setCompra({ ...compra, proveedor: e.target.value })}
      />
      <TextField
        label="Total"
        type="number"
        value={compra.total}
        onChange={(e) => setCompra({ ...compra, total: Number(e.target.value) })}
      />
      <Button onClick={handleSubmit}>Guardar Compra</Button>
      <TableContainer component={Paper}>
        <DataTable columns={columns} rows={compras} />
      </TableContainer>
    </div>
  );
}

export default Compras;