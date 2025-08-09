import { MetodoPago } from "../entities/metodoPago.entity"

export interface IMetodoPagoRepository {
    create(metodoPago: MetodoPago): Promise<number>
    getAll(): Promise<MetodoPago[]>
    getMetodoPago(idMetodoPago: number): Promise<MetodoPago | null>
    update(metodoPago: MetodoPago): Promise<number>
    delete(idMetodoPago: number): Promise<void>    
}