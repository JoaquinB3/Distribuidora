"use client"

import { useState } from "react"
import { Box, Container, Button, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { Add } from "@mui/icons-material"
import { PageHeader } from "@/components/common/PageHeader"
import { SearchBar } from "@/components/common/SearchBar"
import { EmptyState } from "@/components/common/EmptyState"
import { SupplierCard } from "@/components/suppliers/SupplierCard"
import { SupplierForm } from "@/components/suppliers/SupplierForm"
import { useSearch } from "@/hooks/useSearch"
import { initialSuppliers } from "@/lib/data"
import type { Supplier } from "@/types"

export default function ProveedoresPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(suppliers, ["nombre", "contacto"])

  const handleAddSupplier = (supplierData: Omit<Supplier, "id" | "productos">) => {
    const newSupplier = {
      ...supplierData,
      id: Math.max(...suppliers.map((s) => s.id)) + 1,
      productos: [],
    }
    setSuppliers([...suppliers, newSupplier])
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Proveedores" />

        <SearchBar placeholder="Buscar proveedores..." value={searchTerm} onChange={setSearchTerm} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          Nuevo Proveedor
        </Button>

        <Box>
          {filteredItems.length === 0 ? (
            <EmptyState
              title="No hay proveedores"
              description="No se encontraron proveedores que coincidan con tu búsqueda."
            />
          ) : (
            filteredItems.map((supplier) => <SupplierCard key={supplier.id} supplier={supplier} />)
          )}
        </Box>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <SupplierForm onSubmit={handleAddSupplier} onCancel={handleCancel} />
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
