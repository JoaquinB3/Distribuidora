import { Proveedor } from "../entities/proveedor.entity"

export interface IProveedorRepository {
    create(proveedor: Proveedor): Promise<number>
    getAll(): Promise<Proveedor[]>
    getProveedor(idProveedor: number): Promise<Proveedor | null>
    update(proveedor: Proveedor): Promise<void>
    delete(idProveedor: number): Promise<void>    
}