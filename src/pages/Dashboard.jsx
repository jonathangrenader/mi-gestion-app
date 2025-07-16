import { useState, useEffect } from "react";
import { useEmpresa } from "../context/EmpresaContext";
import { obtenerVentas } from "../services/ventas";
import { obtenerCompras } from "../services/compras";
import { obtenerProductos } from "../services/inventario";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import EmpresaSelector from "../components/EmpresaSelector";

function Dashboard() {
  const { empresaActiva } = useEmpresa();
  const [ventasData, setVentasData] = useState([]);
  const [comprasData, setComprasData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalVentas: 0,
    totalCompras: 0,
    stockBajo: 0,
  });

  useEffect(() => {
    if (empresaActiva) {
      const fetchData = async () => {
        const ventas = await obtenerVentas(empresaActiva.id);
        const compras = await obtenerCompras(empresaActiva.id);
        const productos = await obtenerProductos(empresaActiva.id);

        // Calcular métricas
        const totalVentas = ventas.reduce((sum, venta) => sum + venta.total, 0);
        const totalCompras = compras.reduce((sum, compra) => sum + compra.total, 0);
        const stockBajo = productos.filter((prod) => prod.stock < 10).length;

        // Preparar datos para gráficos
        const ventasPorMes = ventas.reduce((acc, venta) => {
          const mes = new Date(venta.fecha).toLocaleString("es", { month: "short" });
          acc[mes] = (acc[mes] || 0) + venta.total;
          return acc;
        }, {});
        const chartData = Object.entries(ventasPorMes).map(([mes, total]) => ({ mes, total }));

        setVentasData(chartData);
        setComprasData(compras);
        setStockData(productos);
        setMetrics({ totalVentas, totalCompras, stockBajo });
      };
      fetchData();
    }
  }, [empresaActiva]);

  return (
    <div>
      <h2>Dashboard</h2>
      <EmpresaSelector />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Ventas</Typography>
              <Typography variant="h4">${metrics.totalVentas}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Compras</Typography>
              <Typography variant="h4">${metrics.totalCompras}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Productos con Stock Bajo</Typography>
              <Typography variant="h4">{metrics.stockBajo}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Ventas por Mes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ventasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;