import Link from "next/link"
import { Box, Container, Typography, Card, CardContent, Avatar } from "@mui/material"
import {
  Inventory as PackageIcon,
  ShoppingCart,
  People as UsersIcon,
  TrendingUp,
  ShoppingBag,
  BarChart as BarChartIcon,
} from "@mui/icons-material"

const sections = [
  {
    title: "Productos",
    description: "Gestionar inventario de bebidas",
    icon: PackageIcon,
    href: "/productos",
    color: "#3b82f6",
  },
  {
    title: "Pedidos",
    description: "Administrar pedidos de clientes",
    icon: ShoppingCart,
    href: "/pedidos",
    color: "#10b981",
  },
  {
    title: "Proveedores",
    description: "Gestionar proveedores",
    icon: UsersIcon,
    href: "/proveedores",
    color: "#8b5cf6",
  },
  {
    title: "Ventas",
    description: "Registrar ventas realizadas",
    icon: TrendingUp,
    href: "/ventas",
    color: "#f59e0b",
  },
  {
    title: "Compras",
    description: "Registrar compras a proveedores",
    icon: ShoppingBag,
    href: "/compras",
    color: "#ef4444",
  },
  {
    title: "Estadísticas",
    description: "Ver reportes y análisis",
    icon: BarChartIcon,
    href: "/estadisticas",
    color: "#6366f1",
  },
]

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 4, pt: 1 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Distribuidora
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            MORELLI
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sistema de gestión integral
          </Typography>
        </Box>

        {/* Flexbox en lugar de Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Box
                key={section.href}
                sx={{
                  flex: "1 1 calc(50% - 8px)", // 2 columnas en pantallas chicas
                  display: "flex",
                }}
              >
                <Link href={section.href} style={{ textDecoration: "none", width: "100%" }}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      flex: 1,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 3,
                      },
                      "&:active": {
                        transform: "scale(0.98)",
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: section.color,
                          width: 56,
                          height: 56,
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <Icon sx={{ fontSize: 28 }} />
                      </Avatar>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontSize: "1rem", lineHeight: 1.2 }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem", lineHeight: 1.2 }}
                      >
                        {section.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Box>
            )
          })}
        </Box>
      </Container>
    </Box>
  )
}
