import { Marca } from "../../domain/entities/marca.entity";
import { IMarcaRepository } from "../../domain/repositories/marca.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { UpdateCategoriaDto } from "../dtos/categoria/updateCategoria.dto";
import { PostMarcaDto } from "../dtos/marca/postMarca.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class MarcaService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.IMarcaRepository) private readonly marcaRepository: IMarcaRepository
    ) {}

    public async getMarca(idMarca: number): Promise<Marca | null> {
        const marca = await this.marcaRepository.getMarca(idMarca);

        if(!marca) throw CustomError.notFound('No se encontro una marca con ese id');
        return marca;
    }

    public async getAll(): Promise<Marca[]> {
        const marcas = await this.marcaRepository.getAll();
        if (marcas.length === 0) throw CustomError.notFound('No se encontraron marcas');
        return marcas;
    }

    public async create(marca: PostMarcaDto): Promise<number> {
        const newMarca = new Marca(
            0,
            marca.nombre,
        );

        const newDbMarcaId = await this.marcaRepository.create(newMarca)
        return newDbMarcaId;
    }
    
    public async update(marca: UpdateCategoriaDto, idMarca: number): Promise<number> {
        const marcaExistente = await this.marcaRepository.getMarca(idMarca);
        if (!marcaExistente) throw CustomError.notFound('No se encontro la marca');

        marcaExistente.setNombre(marca.nombre);
        const updatedMarcaId = await this.marcaRepository.update(marcaExistente);
        return updatedMarcaId;
    }

    public async delete(idMarca: number): Promise<void> {
        const marca = await this.marcaRepository.getMarca(idMarca);
        if (!marca) throw CustomError.notFound('La marca no fue encontrada');
        await this.marcaRepository.delete(marca.getIdMarca());
    }  
}