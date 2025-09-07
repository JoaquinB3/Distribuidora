"use client"

import { useState } from "react"
import { Box, Button, TextField } from "@mui/material"
import type { Supplier } from "@/types"

interface SupplierFormProps {
  onSubmit: (supplier: Omit<Supplier, "id" | "productos">) => void
  onCancel: () => void
  initialData?: Partial<Supplier>
}

export function SupplierForm({ onSubmit, onCancel, initialData }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    contacto: initialData?.contacto || "",
    telefono: initialData?.telefono || "",
    email: initialData?.email || "",
  })

  const handleSubmit = () => {
    if (formData.nombre && formData.contacto && formData.telefono && formData.email) {
      onSubmit({
        nombre: formData.nombre,
        contacto: formData.contacto,
        telefono: formData.telefono,
        email: formData.email,
      })
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Nombre de la Empresa"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Nombre de la empresa"
      />

      <TextField
        fullWidth
        label="Persona de Contacto"
        value={formData.contacto}
        onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
        placeholder="Nombre del contacto"
      />

      <TextField
        fullWidth
        label="Teléfono"
        value={formData.telefono}
        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
        placeholder="+54 11 1234-5678"
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="contacto@empresa.com"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
        <Button variant="contained" onClick={handleSubmit} fullWidth size="large">
          {initialData ? "Actualizar" : "Agregar"} Proveedor
        </Button>
        <Button variant="outlined" onClick={onCancel} fullWidth size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
