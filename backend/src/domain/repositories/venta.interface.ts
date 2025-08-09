import { Venta } from "../entities/venta.entity"

export interface IVentaRepository {
    create(venta: Venta): Promise<number>
    getAll(): Promise<Venta[]>
    getVenta(idVenta: number): Promise<Venta | null>
    delete(idVenta: number): Promise<void>    
}