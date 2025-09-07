"use client"

import { useState } from "react"
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import type { Order } from "@/types"

interface OrderFormProps {
  onSubmit: (order: Omit<Order, "id" | "items">) => void
  onCancel: () => void
  initialData?: Partial<Order>
}

export function OrderForm({ onSubmit, onCancel, initialData }: OrderFormProps) {
  const [formData, setFormData] = useState({
    cliente: initialData?.cliente || "",
    total: initialData?.total?.toString() || "",
    estado: initialData?.estado || ("Pendiente" as const),
  })

  const handleSubmit = () => {
    if (formData.cliente && formData.total) {
      onSubmit({
        cliente: formData.cliente,
        fecha: new Date().toISOString().split("T")[0],
        total: Number.parseInt(formData.total),
        estado: formData.estado,
      })
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Cliente"
        value={formData.cliente}
        onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
        placeholder="Nombre del cliente"
      />

      <TextField
        fullWidth
        label="Total"
        type="number"
        value={formData.total}
        onChange={(e) => setFormData({ ...formData, total: e.target.value })}
        placeholder="Monto total"
      />

      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select
          value={formData.estado}
          label="Estado"
          onChange={(e) => setFormData({ ...formData, estado: e.target.value as any })}
        >
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Entregado">Entregado</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
        <Button variant="contained" onClick={handleSubmit} fullWidth size="large">
          {initialData ? "Actualizar" : "Crear"} Pedido
        </Button>
        <Button variant="outlined" onClick={onCancel} fullWidth size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
