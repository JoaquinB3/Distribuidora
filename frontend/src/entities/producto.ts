export interface ProductoDto {
  idProducto?: number
  codigo: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  idMarca: number
  idCategoria: number
}

export interface Producto {
  id: number
  codigo: number
  nombre: string
  descripcion: string
  precio: number
  stock: number
  idMarca: number
  idCategoria: number
}
