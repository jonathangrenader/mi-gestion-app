import { useState, useEffect } from "react";
import { crearProducto, obtenerProductos } from "../services/inventario";
import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { TextField, Button, TableContainer, Paper } from "@mui/material";
import DataTable from "../components/DataTable";
import EmpresaSelector from "../components/EmpresaSelector";

function Inventario() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    codigo: "",
    stock: 0,
    precio: 0,
  });

  useEffect(() => {
    if (empresaActiva) {
      const fetchProductos = async () => {
        const productosData = await obtenerProductos(empresaActiva.id);
        setProductos(productosData);
      };
      fetchProductos();
    }
  }, [empresaActiva]);

  const handleSubmit = async () => {
    if (!empresaActiva) return alert("Selecciona una empresa");
    await crearProducto(empresaActiva.id, producto);
    setProducto({ nombre: "", codigo: "", stock: 0, precio: 0 });
    const productosData = await obtenerProductos(empresaActiva.id);
    setProductos(productosData);
  };

  const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "codigo", label: "Código" },
    { id: "stock", label: "Stock" },
    { id: "precio", label: "Precio" },
  ];

  return (
    <div>
      <h2>Gestión de Inventario</h2>
      <EmpresaSelector />
      <TextField
        label="Nombre del Producto"
        value={producto.nombre}
        onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
      />
      <TextField
        label="Código"
        value={producto.codigo}
        onChange={(e) => setProducto({ ...producto, codigo: e.target.value })}
      />
      <TextField
        label="Stock"
        type="number"
        value={producto.stock}
        onChange={(e) => setProducto({ ...producto, stock: Number(e.target.value) })}
      />
      <TextField
        label="Precio"
        type="number"
        value={producto.precio}
        onChange={(e) => setProducto({ ...producto, precio: Number(e.target.value) })}
      />
      <Button onClick={handleSubmit}>Agregar Producto</Button>
      <TableContainer component={Paper}>
        <DataTable columns={columns} rows={productos} />
      </TableContainer>
    </div>
  );
}

export default Inventario;