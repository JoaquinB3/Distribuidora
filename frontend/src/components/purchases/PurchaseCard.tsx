import { Box, Card, CardContent, Typography, Chip } from "@mui/material"
import { CalendarToday, LocalShipping } from "@mui/icons-material"
import type { Purchase } from "@/types"

interface PurchaseCardProps {
  purchase: Purchase
}

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const getStatusColor = (status: string): "warning" | "info" | "success" | "error" => {
    switch (status) {
      case "Pendiente":
        return "warning"
      case "En Tránsito":
        return "info"
      case "Recibido":
        return "success"
      case "Cancelado":
        return "error"
      default:
        return "info"
    }
  }

  return (
    <Card
      sx={{
        mb: 2,
        transition: "transform 0.1s",
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: "1rem", lineHeight: 1.2 }}>
              #{purchase.id} - {purchase.proveedor}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary">
                {purchase.fecha}
              </Typography>
            </Box>
          </Box>
          <Chip label={purchase.estado} color={getStatusColor(purchase.estado)} size="small" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 700, color: "primary.main" }}>
              ${purchase.total.toLocaleString()}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalShipping sx={{ fontSize: 16, color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary">
                {purchase.productos} productos
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
