import { Producto } from "../entities/producto.entity"

export interface IProductoRepository {
    create(producto: Producto): Promise<number>
    getAll(): Promise<Producto[]>
    getProducto(idProducto: number): Promise<Producto | null>
    getProductoXCodigo(codigo: number): Promise<Producto | null>
    update(producto: Producto): Promise<void>
    delete(idProducto: number): Promise<void>    
}