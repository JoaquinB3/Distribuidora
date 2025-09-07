import { Box, Card, CardContent, Typography } from "@mui/material"
import { CalendarToday } from "@mui/icons-material"
import type { Sale } from "@/types"

interface SaleCardProps {
  sale: Sale
}

export function SaleCard({ sale }: SaleCardProps) {
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
              #{sale.id} - {sale.cliente}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: "text.disabled" }} />
              <Typography variant="body2" color="text.secondary">
                {sale.fecha}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 700, color: "success.main" }}>
              ${sale.total.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {sale.metodoPago}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          <Box component="span" sx={{ fontWeight: 500 }}>
            Vendedor:
          </Box>{" "}
          {sale.vendedor}
        </Typography>
      </CardContent>
    </Card>
  )
}
