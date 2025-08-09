import { Categoria } from "../entities/categoria.entity"

export interface ICategoriaRepository {
    create(categoria: Categoria): Promise<number>
    getAll(): Promise<Categoria[]>
    getCategoria(idCategoria: number): Promise<Categoria | null>
    getCategoriaPorNombre(nombreCategoria: string): Promise<Categoria | null>
    update(categoria: Categoria): Promise<number>
    delete(idCategoria: number): Promise<void>    
}