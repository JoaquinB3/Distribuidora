import type { Product, Order, Supplier, Sale, Purchase } from "../types/index"

export const initialProducts: Product[] = [
  { id: 1, nombre: "Coca Cola 500ml", categoria: "Gaseosas", precio: 150, stock: 48 },
  { id: 2, nombre: "Agua Mineral 1L", categoria: "Aguas", precio: 80, stock: 72 },
  { id: 3, nombre: "Cerveza Quilmes 473ml", categoria: "Cervezas", precio: 200, stock: 36 },
  { id: 4, nombre: "Jugo Naranja 1L", categoria: "Jugos", precio: 120, stock: 24 },
]

export const initialOrders: Order[] = [
  {
    id: 1,
    cliente: "Kiosco El Sol",
    fecha: "2024-01-15",
    total: 2400,
    estado: "Pendiente",
    items: [
      { producto: "Coca Cola 500ml", cantidad: 12, precio: 150 },
      { producto: "Agua Mineral 1L", cantidad: 6, precio: 80 },
    ],
  },
  {
    id: 2,
    cliente: "Supermercado Central",
    fecha: "2024-01-14",
    total: 5600,
    estado: "Entregado",
    items: [
      { producto: "Cerveza Quilmes 473ml", cantidad: 24, precio: 200 },
      { producto: "Jugo Naranja 1L", cantidad: 8, precio: 120 },
    ],
  },
]

export const initialSuppliers: Supplier[] = [
  {
    id: 1,
    nombre: "Coca Cola Argentina",
    contacto: "Juan Pérez",
    telefono: "+54 11 4567-8901",
    email: "juan.perez@cocacola.com",
    productos: ["Coca Cola", "Sprite", "Fanta"],
  },
  {
    id: 2,
    nombre: "Cervecería Quilmes",
    contacto: "María González",
    telefono: "+54 11 2345-6789",
    email: "maria.gonzalez@quilmes.com",
    productos: ["Quilmes", "Stella Artois", "Corona"],
  },
]

export const initialSales: Sale[] = [
  {
    id: 1,
    cliente: "Kiosco La Esquina",
    fecha: "2024-01-15",
    total: 3200,
    metodoPago: "Efectivo",
    vendedor: "Carlos Ruiz",
  },
  {
    id: 2,
    cliente: "Bar El Encuentro",
    fecha: "2024-01-14",
    total: 5800,
    metodoPago: "Transferencia",
    vendedor: "Ana López",
  },
  {
    id: 3,
    cliente: "Restaurante Don Mario",
    fecha: "2024-01-13",
    total: 12400,
    metodoPago: "Cheque",
    vendedor: "Pedro García",
  },
]

export const initialPurchases: Purchase[] = [
  {
    id: 1,
    proveedor: "Coca Cola Argentina",
    fecha: "2024-01-10",
    total: 45000,
    estado: "Recibido",
    productos: 120,
  },
  {
    id: 2,
    proveedor: "Cervecería Quilmes",
    fecha: "2024-01-08",
    total: 32000,
    estado: "Pendiente",
    productos: 80,
  },
  {
    id: 3,
    proveedor: "Aguas Danone",
    fecha: "2024-01-05",
    total: 18500,
    estado: "En Tránsito",
    productos: 200,
  },
]
