import { Marca } from "../entities/marca.entity"

export interface IMarcaRepository {
    create(marca: Marca): Promise<number>
    getAll(): Promise<Marca[]>
    getMarca(idMarca: number): Promise<Marca | null>
    getMarcaPorNombre(nombreMarca: string): Promise<Marca | null>,
    update(marca: Marca): Promise<number>
    delete(idMarca: number): Promise<void>    
}