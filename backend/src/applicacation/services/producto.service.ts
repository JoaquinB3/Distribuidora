import { Producto } from "../../domain/entities/producto.entity";
import { IProductoRepository } from "../../domain/repositories/producto.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostProductoDto } from "../dtos/producto/postProducto.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ProductoService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.IProductoRepository) private readonly productoRepository: IProductoRepository
    ) {}

    public async getProducto(idProducto: number): Promise<Producto | null> {
            const producto = await this.productoRepository.getProducto(idProducto);
    
            if(!producto) throw CustomError.notFound('No se encontro un producto con ese id');
            return producto;
        }
    
    public async getAll(): Promise<Producto[]> {
        const productos = await this.productoRepository.getAll();
        if (productos.length === 0) throw CustomError.notFound('No se encontraron productos');
        return productos;
    }
}