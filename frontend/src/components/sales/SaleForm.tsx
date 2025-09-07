"use client"

import { useState } from "react"
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import type { Sale } from "@/types"

interface SaleFormProps {
  onSubmit: (sale: Omit<Sale, "id" | "fecha">) => void
  onCancel: () => void
  initialData?: Partial<Sale>
}

export function SaleForm({ onSubmit, onCancel, initialData }: SaleFormProps) {
  const [formData, setFormData] = useState({
    cliente: initialData?.cliente || "",
    total: initialData?.total?.toString() || "",
    metodoPago: initialData?.metodoPago || "",
    vendedor: initialData?.vendedor || "",
  })

  const handleSubmit = () => {
    if (formData.cliente && formData.total && formData.metodoPago && formData.vendedor) {
      onSubmit({
        cliente: formData.cliente,
        total: Number.parseInt(formData.total),
        metodoPago: formData.metodoPago,
        vendedor: formData.vendedor,
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
        <InputLabel>Método de Pago</InputLabel>
        <Select
          value={formData.metodoPago}
          label="Método de Pago"
          onChange={(e) => setFormData({ ...formData, metodoPago: e.target.value })}
        >
          <MenuItem value="Efectivo">Efectivo</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
          <MenuItem value="Cheque">Cheque</MenuItem>
          <MenuItem value="Tarjeta">Tarjeta</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Vendedor"
        value={formData.vendedor}
        onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
        placeholder="Nombre del vendedor"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
        <Button variant="contained" onClick={handleSubmit} fullWidth size="large">
          {initialData ? "Actualizar" : "Registrar"} Venta
        </Button>
        <Button variant="outlined" onClick={onCancel} fullWidth size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
