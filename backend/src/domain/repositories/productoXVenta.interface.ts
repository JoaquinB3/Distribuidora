import { ProductoXVenta } from "../entities/productoXVenta.entity"

export interface IProductoXVentaRepository {
    create(productoXVenta: ProductoXVenta): Promise<number>
    getAll(): Promise<ProductoXVenta[]>
    getProductoXVenta(idProductoXVenta: number): Promise<ProductoXVenta | null>
    update(productoXVenta: ProductoXVenta): Promise<number>
    delete(idProductoXVenta: number): Promise<void>    
}