"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Typography,
} from "@mui/material"
import { Add } from "@mui/icons-material"
import { PageHeader } from "@/components/common/PageHeader"
import { SearchBar } from "@/components/common/SearchBar"
import { EmptyState } from "@/components/common/EmptyState"
import { SaleCard } from "@/components/sales/SaleCard"
import { SaleForm } from "@/components/sales/SaleForm"
import { useSearch } from "@/hooks/useSearch"
import { initialSales } from "@/lib/data"
import type { Sale } from "@/types"

export default function VentasPage() {
  const [sales, setSales] = useState(initialSales)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(sales, ["cliente", "vendedor"])

  const totalVentas = sales.reduce((sum, sale) => sum + sale.total, 0)

  const handleAddSale = (saleData: Omit<Sale, "id" | "fecha">) => {
    const newSale = {
      ...saleData,
      id: Math.max(...sales.map((s) => s.id)) + 1,
      fecha: new Date().toISOString().split("T")[0],
    }
    setSales([...sales, newSale])
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Ventas" />

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: "center", p: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total Ventas del Mes
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
              ${totalVentas.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <SearchBar placeholder="Buscar ventas..." value={searchTerm} onChange={setSearchTerm} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          Nueva Venta
        </Button>

        <Box>
          {filteredItems.length === 0 ? (
            <EmptyState title="No hay ventas" description="No se encontraron ventas que coincidan con tu búsqueda." />
          ) : (
            filteredItems.map((sale) => <SaleCard key={sale.id} sale={sale} />)
          )}
        </Box>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Registrar Nueva Venta</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <SaleForm onSubmit={handleAddSale} onCancel={handleCancel} />
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
