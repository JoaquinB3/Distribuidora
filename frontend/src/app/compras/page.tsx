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
import { PurchaseCard } from "@/components/purchases/PurchaseCard"
import { PurchaseForm } from "@/components/purchases/PurchaseForm"
import { useSearch } from "@/hooks/useSearch"
import { initialPurchases } from "@/lib/data"
import type { Purchase } from "@/types"

export default function ComprasPage() {
  const [purchases, setPurchases] = useState(initialPurchases)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(purchases, ["proveedor"])

  const totalCompras = purchases.reduce((sum, purchase) => sum + purchase.total, 0)

  const handleAddPurchase = (purchaseData: Omit<Purchase, "id" | "fecha" | "productos">) => {
    const newPurchase = {
      ...purchaseData,
      id: Math.max(...purchases.map((p) => p.id)) + 1,
      fecha: new Date().toISOString().split("T")[0],
      productos: Math.floor(Math.random() * 100) + 20,
    }
    setPurchases([...purchases, newPurchase])
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Compras" />

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: "center", p: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Total Compras del Mes
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
              ${totalCompras.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <SearchBar placeholder="Buscar compras..." value={searchTerm} onChange={setSearchTerm} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          Nueva Compra
        </Button>

        <Box>
          {filteredItems.length === 0 ? (
            <EmptyState title="No hay compras" description="No se encontraron compras que coincidan con tu búsqueda." />
          ) : (
            filteredItems.map((purchase) => <PurchaseCard key={purchase.id} purchase={purchase} />)
          )}
        </Box>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Registrar Nueva Compra</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <PurchaseForm onSubmit={handleAddPurchase} onCancel={handleCancel} />
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
