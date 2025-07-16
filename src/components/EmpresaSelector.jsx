import { useEmpresa } from "../context/EmpresaContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EmpresaSelector() {
  const { empresas, empresaActiva, setEmpresaActiva, loading } = useEmpresa();

  if (loading) return <div>Cargando empresas...</div>;

  return (
    <FormControl fullWidth>
      <InputLabel>Empresa</InputLabel>
      <Select
        value={empresaActiva?.id || ""}
        onChange={(e) => {
          const selected = empresas.find((emp) => emp.id === e.target.value);
          setEmpresaActiva(selected);
        }}
      >
        {empresas.map((empresa) => (
          <MenuItem key={empresa.id} value={empresa.id}>
            {empresa.nombre} (CUIT: {empresa.cuit})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default EmpresaSelector;