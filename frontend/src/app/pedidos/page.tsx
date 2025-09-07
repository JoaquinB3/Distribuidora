"use client"

import { useState } from "react"
import { Box, Container, Button, Dialog, DialogTitle, DialogContent } from "@mui/material"
import { Add } from "@mui/icons-material"
import { PageHeader } from "@/components/common/PageHeader"
import { SearchBar } from "@/components/common/SearchBar"
import { EmptyState } from "@/components/common/EmptyState"
import { OrderCard } from "@/components/orders/OrderCard"
import { OrderForm } from "@/components/orders/OrderForm"
import { useSearch } from "@/hooks/useSearch"
import { initialOrders } from "@/lib/data"
import type { Order } from "@/types"

export default function PedidosPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { searchTerm, setSearchTerm, filteredItems } = useSearch(orders, ["cliente", "estado"])

  const handleAddOrder = (orderData: Omit<Order, "id" | "items">) => {
    const newOrder = {
      ...orderData,
      id: Math.max(...orders.map((o) => o.id)) + 1,
      items: [],
    }
    setOrders([...orders, newOrder])
    setIsDialogOpen(false)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2, pb: 3 }}>
      <Container maxWidth="sm">
        <PageHeader title="Pedidos" />

        <SearchBar placeholder="Buscar pedidos..." value={searchTerm} onChange={setSearchTerm} />

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Add />}
          onClick={() => setIsDialogOpen(true)}
          sx={{ mb: 3 }}
        >
          Nuevo Pedido
        </Button>

        <Box>
          {filteredItems.length === 0 ? (
            <EmptyState title="No hay pedidos" description="No se encontraron pedidos que coincidan con tu búsqueda." />
          ) : (
            filteredItems.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </Box>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Crear Nuevo Pedido</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1 }}>
              <OrderForm onSubmit={handleAddOrder} onCancel={handleCancel} />
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  )
}
