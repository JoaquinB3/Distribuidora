"use client"

import { Box, Container, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { AttachMoney, Inventory, People, ShoppingCart } from "@mui/icons-material"
import { PageHeader } from "@/components/common/PageHeader"
import { StatsCard } from "@/components/common/StatsCard"

const stats = [
  {
    title: "Ventas del Mes",
    value: "$95,400",
    change: "+12.5%",
    trend: "up" as const,
    icon: AttachMoney,
    color: "#10b981",
  },
  {
    title: "Productos en Stock",
    value: "1,248",
    change: "-3.2%",
    trend: "down" as const,
    icon: Inventory,
    color: "#3b82f6",
  },
  {
    title: "Clientes Activos",
    value: "156",
    change: "+8.1%",
    trend: "up" as const,
    icon: People,
    color: "#8b5cf6",
  },
  {
    title: "Pedidos Pendientes",
    value: "23",
    change: "+5.4%",
    trend: "up" as const,
    icon: ShoppingCart,
    color: "#f59e0b",
  },
]

const topProducts = [
  { nombre: "Coca Cola 500ml", ventas: 245, ingresos: 36750 },
  { nombre: "Agua Mineral 1L", ventas: 189, ingresos: 15120 },
  { nombre: "Cerveza Quilmes 473ml", ventas: 156, ingresos: 31200 },
  { nombre: "Jugo Naranja 1L", ventas: 98, ingresos: 11760 },
]

const recentSales = [
  { cliente: "Kiosco El Sol", monto: 2400, fecha: "Hoy" },
  { cliente: "Bar Central", monto: 5600, fecha: "Ayer" },
  { cliente: "Supermercado Norte", monto: 12400, fecha: "2 días" },
  { cliente: "Restaurante Plaza", monto: 8900, fecha: "3 días" },
]

export default function EstadisticasPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Estadísticas" />

        {/* Flexbox en lugar de Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 calc(50% - 8px)", // dos columnas iguales
                display: "flex",
              }}
            >
              <StatsCard {...stat} />
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Productos Más Vendidos
                </Typography>
              }
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {topProducts.map((product, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.2 }}>
                        {product.nombre}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.ventas} unidades
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                      ${product.ingresos.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Ventas Recientes
                </Typography>
              }
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {recentSales.map((sale, index) => (
                  <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.2 }}>
                        {sale.cliente}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {sale.fecha}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.875rem", color: "success.main" }}>
                      ${sale.monto.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  Resumen del Mes
                </Typography>
              }
              sx={{ pb: 1 }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box sx={{ textAlign: "center", p: 2, bgcolor: "#f0fdf4", borderRadius: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                    $95,400
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Ventas
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", p: 2, bgcolor: "#eff6ff", borderRadius: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
                    $67,200
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Compras
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", p: 2, bgcolor: "#faf5ff", borderRadius: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "secondary.main" }}>
                    $28,200
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ganancia Neta
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

