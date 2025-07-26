import { Compra } from "../entities/compra.entity"

export interface ICompraRepository {
    create(compra: Compra): Promise<number>
    getAll(): Promise<Compra[]>
    getCompra(idCompra: number): Promise<Compra | null>
    update(compra: Compra): Promise<void>
    delete(idCompra: number): Promise<void>    
}