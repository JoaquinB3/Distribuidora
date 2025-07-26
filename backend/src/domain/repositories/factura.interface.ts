import { Factura } from "../entities/factura.entity"

export interface IFacturaRepository {
    create(factura: Factura): Promise<number>
    getAll(): Promise<Factura[]>
    getFactura(idFactura: number): Promise<Factura | null>
    update(factura: Factura): Promise<void>
    delete(idFactura: number): Promise<void>    
}