import { Marca } from "../entities/marca.entity"

export interface IMarcaRepository {
    create(marca: Marca): Promise<number>
    getAll(): Promise<Marca[]>
    getMarca(idMarca: number): Promise<Marca | null>
    update(marca: Marca): Promise<void>
    delete(idMarca: number): Promise<void>    
}