import { Categoria } from "../../domain/entities/categoria.entity";
import { ICategoriaRepository } from "../../domain/repositories/categoria.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostCategoriaDto } from "../dtos/categoria/postCategoria.dto";
import { UpdateCategoriaDto } from "../dtos/categoria/updateCategoria.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class CategoriaService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.ICategoriaRepository) private readonly categoriaRepository: ICategoriaRepository
    ) {}
    
    public async getCategoria(idCategoria: number): Promise<Categoria | null> {
        const categoria = await  this.categoriaRepository.getCategoria(idCategoria);

        if (!categoria) throw CustomError.notFound('No se encontro una categoria con ese id');
        return categoria;
    }
    
    public async getAll(): Promise<Categoria[]> {
        const categorias = await this.categoriaRepository.getAll();
        if (categorias.length === 0) throw CustomError.notFound('No se encontraron categorias');
        return categorias;
    }
    
    public async create(categoria: PostCategoriaDto): Promise<number> {
        const newCategoria = new Categoria(
            0,
            categoria.nombre,
        );

        await this.categoriaRepository.create(newCategoria)
        return newCategoria.getIdCategoria();
    }

    public async update(categoria: UpdateCategoriaDto): Promise<void> {
        const categoriaExistente = await this.categoriaRepository.getCategoriaPorNombre(categoria.nombre);
        if (!categoriaExistente) throw CustomError.notFound('No se encontro la categoria');

        categoriaExistente.setNombre(categoria.nombre);
    }

    public async delete(idCategoria: number): Promise<void> {
        const categoria = await this.categoriaRepository.getCategoria(idCategoria);
        if (!categoria) throw CustomError.notFound('La categoria no fue encontrada');
        await this.categoriaRepository.delete(categoria.getIdCategoria());
    } 
}