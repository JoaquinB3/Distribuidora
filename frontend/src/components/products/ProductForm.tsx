"use client"

import { useState } from "react"
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { toast } from "react-toastify"
import type { ProductoDto } from "@/entities/producto"

interface ProductFormProps {
  onSubmit: (product: ProductoDto) => void
  onCancel: () => void
  initialData?: Partial<ProductoDto>
}

interface Categoria {
  id: number
  nombre: string
}

interface Marca {
  id: number
  nombre: string
}

export function ProductForm({ onSubmit, onCancel, initialData }: ProductFormProps) {
  // Hardcodeadas por ahora
  const categorias: Categoria[] = [
    { id: 6, nombre: "Gaseosa" },
    { id: 7, nombre: "Cerveza" },
    { id: 8, nombre: "Vino" },
    { id: 11, nombre: "Fernet" },
  ]

  const marcas: Marca[] = [
    { id: 1, nombre: "Coca-Cola" },
    { id: 2, nombre: "Brahma" },
    { id: 3, nombre: "Manaos" },
    { id: 5, nombre: "Branca" },
  ]

  const [formData, setFormData] = useState({
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    precio: initialData?.precio?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    idCategoria: initialData?.idCategoria || categorias[0].id,
    idMarca: initialData?.idMarca || marcas[0].id,
    codigo: initialData?.codigo || Math.floor(Math.random() * 1000000),
  })

  const handleSubmit = () => {
    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.stock) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    onSubmit({
      codigo: Number(formData.codigo),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      idCategoria: Number(formData.idCategoria),
      idMarca: Number(formData.idMarca),
    })

    if (initialData) {
      toast.success("Producto actualizado correctamente ✅")
    } else {
      toast.success("Producto agregado correctamente 🎉")
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextField
        fullWidth
        label="Nombre"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        placeholder="Nombre del producto"
      />

      <TextField
        fullWidth
        label="Descripción"
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        placeholder="Descripción del producto"
      />

      <FormControl fullWidth>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={formData.idCategoria}
          label="Categoría"
          onChange={(e) => setFormData({ ...formData, idCategoria: Number(e.target.value) })}
        >
          {categorias.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Marca</InputLabel>
        <Select
          value={formData.idMarca}
          label="Marca"
          onChange={(e) => setFormData({ ...formData, idMarca: Number(e.target.value) })}
        >
          {marcas.map((m) => (
            <MenuItem key={m.id} value={m.id}>
              {m.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Precio"
        type="number"
        value={formData.precio}
        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
        placeholder="Precio unitario"
      />

      <TextField
        fullWidth
        label="Stock"
        type="number"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        placeholder="Cantidad en stock"
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, pt: 1 }}>
        <Button variant="contained" onClick={handleSubmit} fullWidth size="large">
          {initialData ? "Actualizar" : "Agregar"} Producto
        </Button>
        <Button variant="outlined" onClick={onCancel} fullWidth size="large">
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}
