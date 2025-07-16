import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import EmpresaSelector from "./EmpresaSelector";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestión Empresarial {empresaActiva ? `- ${empresaActiva.nombre}` : ""}
        </Typography>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <EmpresaSelector />
            <Button color="inherit" onClick={() => navigate("/")}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate("/ventas")}>
              Ventas
            </Button>
            <Button color="inherit" onClick={() => navigate("/compras")}>
              Compras
            </Button>
            <Button color="inherit" onClick={() => navigate("/inventario")}>
              Inventario
            </Button>
            <Button color="inherit" onClick={() => navigate("/gestion-empresas")}>
              Empresas
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;