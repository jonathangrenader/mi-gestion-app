import { useAuth } from "../context/AuthContext";
import { useEmpresa } from "../context/EmpresaContext";
import { Drawer, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { user } = useAuth();
  const { empresaActiva } = useEmpresa();
  const navigate = useNavigate();

  // Simulación de plan (en producción, verificar con suscripción)
  const plan = "Premium"; // Esto debería venir de suscripciones.js

  const menuItems = [
    { text: "Dashboard", path: "/", available: true },
    { text: "Ventas", path: "/ventas", available: true },
    { text: "Compras", path: "/compras", available: true },
    { text: "Inventario", path: "/inventario", available: true },
    { text: "Contabilidad", path: "/contabilidad", available: plan === "Lite" || plan === "Premium" },
    { text: "Gestión de Empresas", path: "/gestion-empresas", available: true },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        {menuItems.map((item) =>
          item.available ? (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ) : null
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;