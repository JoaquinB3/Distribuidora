"use client"

import { useState } from "react"
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import type { Purchase } from "@/types"

interface PurchaseFormProps {
  onSubmit: (purchase: Omit<Purchase, "id" | "fecha" | "productos">) => void
  onCancel: () => void
  initialData?: Partial<Purchase>
}

export function PurchaseForm({ onSubmit, onCancel, initialData }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    proveedor: initialData?.proveedor || "",
    total: initialData?.total?.toString() || "",
    estado: initialData?.estado || ("Pendiente" as const),
  })

  const handleSubmit = () => {
    if (formData.proveedor && formData.total) {
      onSubmit({
        proveedor: formData.proveedor,
        total: Number.parseInt(formData.total),
        estado: formData.estado,
      })
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel>Proveedor</InputLabel>
        <Select
          value={formData.proveedor}
          label="Proveedor"
          onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
        >
          <MenuItem value="Coca Cola Argentina">Coca Cola Argentina</MenuItem>
          <MenuItem value="Cervecería Quilmes">Cervecería Quilmes</MenuItem>
          <MenuItem value="Aguas Danone">Aguas Danone</MenuItem>
          <MenuItem value="Jugos Baggio">Jugos Baggio</MenuItem>
        </Select>
      </FormControl>

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
          <MenuItem value="En Tránsito">En Tránsito</MenuItem>
          <MenuItem value="Recibido">Recibido</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
        <Button variant="contained" onClick={handleSubmit} fullWidth size="large">
          {initialData ? "Actualizar" : "Registrar"} Compra
        </Button>
        <Button variant="outlined" onClick={onCancel} fullWidth size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
