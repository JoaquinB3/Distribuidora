"use client"

import { useEffect, useState } from "react"
import { Box, Container, Button, Dialog, DialogTitle, DialogContent, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import { toast } from "react-toastify"

import { PageHeader } from "@/components/common/PageHeader"
import { SearchBar } from "@/components/common/SearchBar"
import { EmptyState } from "@/components/common/EmptyState"
import { ProductCard } from "@/components/products/ProductCard"
import { ProductForm } from "@/components/products/ProductForm"
import { useSearch } from "@/hooks/useSearch"
import type { ProductoDto, Producto } from "@/entities/producto"
import { ProductoService } from "@/services/producto.service"

export default function ProductosPage() {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null)

  const { searchTerm, setSearchTerm, filteredItems } = useSearch(products, ["nombre"])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductoService.getAll()
        setProducts(data)
      } catch (error) {
        console.error(error)
        toast.error("Error al cargar productos")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddProduct = async (productData: ProductoDto) => {
    try {
      const newProduct = await ProductoService.create(productData)
      setProducts([...products, newProduct])
      setIsDialogOpen(false)
      toast.success("Producto agregado correctamente")
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  const handleUpdateProduct = async (id: number, updatedData: ProductoDto) => {
    try {
      await ProductoService.update(id, updatedData)
      setProducts(products.map(p => (p.id === id ? { ...p, ...updatedData } : p)))
      toast.success("Producto actualizado")
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    try {
      await ProductoService.delete(id)
      setProducts(products.filter(p => p.id !== id))
      toast.success("Producto eliminado")
    } catch (error) {
      if (error instanceof Error) toast.error(error.message)
    }
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Productos" />

        <SearchBar placeholder="Buscar productos..." value={searchTerm} onChange={setSearchTerm} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          {editingProduct ? "Editar Producto" : "Nuevo Producto"}
        </Button>

        {loading ? (
          <Typography>Cargando productos...</Typography>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            title="No hay productos"
            description="No se encontraron productos que coincidan con tu búsqueda."
          />
        ) : (
          filteredItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={(p) => {
                setEditingProduct(p)
                setIsDialogOpen(true)
              }}
              onDelete={handleDeleteProduct}
            />
          ))
        )}

        <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <ProductForm
                onSubmit={(data) => {
                  if (editingProduct) handleUpdateProduct(editingProduct.id, data)
                  else handleAddProduct(data)
                  handleDialogClose()
                }}
                onCancel={handleDialogClose}
                initialData={editingProduct || undefined}
              />
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
