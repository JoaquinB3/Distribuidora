export interface Product {
  id: number
  nombre: string
  categoria: string
  precio: number
  stock: number
}

export interface Order {
  id: number
  cliente: string
  fecha: string
  total: number
  estado: "Pendiente" | "Entregado" | "Cancelado"
  items: OrderItem[]
}

export interface OrderItem {
  producto: string
  cantidad: number
  precio: number
}

export interface Supplier {
  id: number
  nombre: string
  contacto: string
  telefono: string
  email: string
  productos: string[]
}

export interface Sale {
  id: number
  cliente: string
  fecha: string
  total: number
  metodoPago: string
  vendedor: string
}

export interface Purchase {
  id: number
  proveedor: string
  fecha: string
  total: number
  estado: "Pendiente" | "En Tránsito" | "Recibido" | "Cancelado"
  productos: number
}

export interface StatCard {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: any
  color: string
}
