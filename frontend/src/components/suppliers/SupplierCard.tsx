import { Box, Card, CardContent, Typography, Chip } from "@mui/material"
import { Phone, Email } from "@mui/icons-material"
import type { Supplier } from "@/types"

interface SupplierCardProps {
  supplier: Supplier
}

export function SupplierCard({ supplier }: SupplierCardProps) {
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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: "1rem", lineHeight: 1.2 }}>
            {supplier.nombre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {supplier.contacto}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Phone sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="body2">{supplier.telefono}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Email sx={{ fontSize: 16, color: "text.disabled" }} />
            <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
              {supplier.email}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
            Productos:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {supplier.productos.map((producto, index) => (
              <Chip key={index} label={producto} size="small" color="primary" variant="outlined" />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
