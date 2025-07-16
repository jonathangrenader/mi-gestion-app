import { useState, useEffect } from "react";
import { crearVenta, obtenerVentas } from "../services/ventas";
import { generarFactura, verificarSuscripcionAFIP } from "../services/afip";
import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { TextField, Button, TableContainer, Paper, Alert } from "@mui/material";
import DataTable from "../components/DataTable";
import EmpresaSelector from "../components/EmpresaSelector";

function Ventas() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState({
    cliente: "",
    clienteCuit: "",
    fecha: new Date().toISOString().slice(0, 10),
    total: 0,
    items: [],
  });
  const [puedeUsarAFIP, setPuedeUsarAFIP] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (empresaActiva) {
      const fetchVentas = async () => {
        const ventasData = await obtenerVentas(empresaActiva.id);
        setVentas(ventasData);
      };
      const checkAFIP = async () => {
        const allowed = await verificarSuscripcionAFIP(user.uid);
        setPuedeUsarAFIP(allowed);
      };
      fetchVentas();
      checkAFIP();
    }
  }, [empresaActiva, user]);

  const handleSubmit = async () => {
    if (!empresaActiva) return setError("Selecciona una empresa");
    try {
      let facturaData = null;
      if (puedeUsarAFIP) {
        facturaData = await generarFactura(empresaActiva.id, {
          clienteCuit: venta.clienteCuit,
          total: venta.total,
          cliente: venta.cliente,
        });
      }
      await crearVenta(empresaActiva.id, {
        ...venta,
        cae: facturaData?.cae || null,
        vencimientoCae: facturaData?.vencimientoCae || null,
      });
      setVenta({ cliente: "", clienteCuit: "", fecha: new Date().toISOString().slice(0, 10), total: 0, items: [] });
      setError("");
      const ventasData = await obtenerVentas(empresaActiva.id);
      setVentas(ventasData);
    } catch (err) {
      setError("Error al registrar la venta: " + err.message);
    }
  };

  const columns = [
    { id: "cliente", label: "Cliente" },
    { id: "fecha", label: "Fecha" },
    { id: "total", label: "Total" },
    { id: "cae", label: "CAE" },
  ];

  return (
    <div>
      <h2>Registrar Venta</h2>
      <EmpresaSelector />
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Cliente"
        value={venta.cliente}
        onChange={(e) => setVenta({ ...venta, cliente: e.target.value })}
      />
      {puedeUsarAFIP && (
        <TextField
          label="CUIT del Cliente"
          value={venta.clienteCuit}
          onChange={(e) => setVenta({ ...venta, clienteCuit: e.target.value })}
        />
      )}
      <TextField
        label="Total"
        type="number"
        value={venta.total}
        onChange={(e) => setVenta({ ...venta, total: Number(e.target.value) })}
      />
      <Button onClick={handleSubmit}>
        {puedeUsarAFIP ? "Generar Factura Electrónica" : "Registrar Venta"}
      </Button>
      <TableContainer component={Paper}>
        <DataTable columns={columns} rows={ventas} />
      </TableContainer>
    </div>
  );
}

export default Ventas;