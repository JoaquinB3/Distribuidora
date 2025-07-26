import { ProductoXCompra } from "../entities/productoXCompra.entity"

export interface IProductoXCompraRepository {
    create(productoXCompra: ProductoXCompra): Promise<number>
    getAll(): Promise<ProductoXCompra[]>
    getProductoXCompra(idProductoXCompra: number): Promise<ProductoXCompra | null>
    update(productoXCompra: ProductoXCompra): Promise<void>
    delete(idProductoXCompra: number): Promise<void>    
}