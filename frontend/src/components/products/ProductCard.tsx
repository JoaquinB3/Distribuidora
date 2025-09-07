"use client"

import { Box, Card, CardContent, Typography, Chip, IconButton } from "@mui/material"
import { Edit, Delete } from "@mui/icons-material"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (id: number) => void
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const getStockColor = (stock: number): "success" | "warning" | "error" => {
    if (stock > 20) return "success"
    if (stock > 10) return "warning"
    return "error"
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
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontSize: "1rem", lineHeight: 1.2 }}>
              {product.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product.categoria}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
              <Typography variant="h6" sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
                ${product.precio}
              </Typography>
              <Chip
                label={`Stock: ${product.stock}`}
                color={getStockColor(product.stock)}
                size="small"
                sx={{ width: "fit-content" }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 2 }}>
            {onEdit && (
              <IconButton
                onClick={() => onEdit(product)}
                sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
              >
                <Edit fontSize="small" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                onClick={() => onDelete(product.id)}
                sx={{ bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
