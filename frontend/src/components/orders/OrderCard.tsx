"use client"

import { Box, Card, CardContent, Typography, Chip, Button } from "@mui/material"
import { Visibility } from "@mui/icons-material"
import type { Order } from "@/types"

interface OrderCardProps {
  order: Order
  onViewDetails?: (order: Order) => void
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusColor = (status: string): "warning" | "success" | "error" | "default" => {
    switch (status) {
      case "Pendiente":
        return "warning"
      case "Entregado":
        return "success"
      case "Cancelado":
        return "error"
      default:
        return "default"
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
              #{order.id} - {order.cliente}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.fecha}
            </Typography>
          </Box>
          <Chip label={order.estado} color={getStatusColor(order.estado)} size="small" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 700, color: "success.main" }}>
              ${order.total.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {order.items.length} productos
            </Typography>
          </Box>
          {onViewDetails && (
            <Button variant="outlined" size="small" startIcon={<Visibility />} onClick={() => onViewDetails(order)}>
              Ver
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
