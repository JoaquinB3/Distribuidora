import { ProductoXVenta } from "../entities/productoXVenta.entity"

export interface IProductoXVentaRepository {
    create(productoXVenta: ProductoXVenta): Promise<number>
    getAll(): Promise<ProductoXVenta[]>
    getProdctoXVenta(idProductoXVenta: number): Promise<ProductoXVenta | null>
    update(productoXVenta: ProductoXVenta): Promise<void>
    delete(idProductoXVenta: number): Promise<void>    
}