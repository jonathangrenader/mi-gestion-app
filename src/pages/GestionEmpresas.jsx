import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { crearEmpresa } from "../services/empresas";
import { TextField, Button, TableContainer, Paper } from "@mui/material";
import DataTable from "../components/DataTable";

function GestionEmpresas() {
  const { user } = useAuth();
  const { empresas, setEmpresaActiva } = useEmpresa();
  const [nuevaEmpresa, setNuevaEmpresa] = useState({ nombre: "", cuit: "" });

  const handleCrearEmpresa = async () => {
    if (!nuevaEmpresa.nombre || !nuevaEmpresa.cuit) return alert("Completa todos los campos");
    await crearEmpresa(user.uid, nuevaEmpresa);
    setNuevaEmpresa({ nombre: "", cuit: "" });
  };

  const handleSeleccionarEmpresa = (empresaId) => {
    const empresa = empresas.find((emp) => emp.id === empresaId);
    setEmpresaActiva(empresa);
  };

  const columns = [
    { id: "nombre", label: "Nombre" },
    { id: "cuit", label: "CUIT" },
    { id: "role", label: "Rol" },
    {
      id: "acciones",
      label: "Acciones",
      render: (row) => (
        <Button onClick={() => handleSeleccionarEmpresa(row.id)}>Seleccionar</Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Gestión de Empresas</h2>
      <h3>Crear Nueva Empresa</h3>
      <TextField
        label="Nombre"
        value={nuevaEmpresa.nombre}
        onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
      />
      <TextField
        label="CUIT"
        value={nuevaEmpresa.cuit}
        onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, cuit: e.target.value })}
      />
      <Button onClick={handleCrearEmpresa}>Crear Empresa</Button>
      <h3>Empresas Asociadas</h3>
      <TableContainer component={Paper}>
        <DataTable
          columns={columns}
          rows={empresas.map((emp) => ({
            id: emp.id,
            nombre: emp.nombre,
            cuit: emp.cuit,
            role: emp.role,
          }))}
        />
      </TableContainer>
    </div>
  );
}

export default GestionEmpresas;