import { Producto } from "../../domain/entities/producto.entity";
import { ICategoriaRepository } from "../../domain/repositories/categoria.interface";
import { IMarcaRepository } from "../../domain/repositories/marca.interface";
import { IProductoRepository } from "../../domain/repositories/producto.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostProductoDto } from "../dtos/producto/postProducto.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ProductoService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.IProductoRepository) private readonly productoRepository: IProductoRepository,
        @Inject(REPOSITORIES_TOKENS.ICategoriaRepository) private readonly categoriaRepository: ICategoriaRepository,
        @Inject(REPOSITORIES_TOKENS.IMarcaRepository) private readonly marcaRepository: IMarcaRepository,
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

    public async create(producto: PostProductoDto): Promise<number> {

        const marca = await this.marcaRepository.getMarca(producto.idMarca)
        const categoria = await this.categoriaRepository.getCategoria(producto.idCategoria)

        if (!marca) throw CustomError.notFound('La marca no existe');
        if (!categoria) throw CustomError.notFound('La categoria no existe');

        const newProducto = new Producto(
            0,
            producto.codigo,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            marca.getIdMarca(),
            categoria.getIdCategoria(),
        );

        await this.productoRepository.create(newProducto)
        return newProducto.getIdProducto();
    }

    public async update(producto: PostProductoDto): Promise<void> {
        const productoExistente = await this.productoRepository.getProductoXCodigo(producto.codigo);
        if (!productoExistente) throw CustomError.notFound('No se encontro el producto');

        const marca = await this.marcaRepository.getMarca(producto.idMarca);
        const categoria = await this.categoriaRepository.getCategoria(producto.idCategoria);

        if (!marca) throw CustomError.notFound('No se encontro la marca');
        if (!categoria) throw CustomError.notFound('No se encontro la categoria');

        productoExistente.setCodigo(producto.codigo);
        productoExistente.setNombre(producto.nombre);
        productoExistente.setDescripcion(producto.descripcion);
        productoExistente.setPrecio(producto.precio);
        productoExistente.setStock(producto.stock);
        productoExistente.setIdMarca(marca.getIdMarca());
        productoExistente.setIdCategoria(categoria.getIdCategoria());
    }

    public async delete(idProducto: number): Promise<void> {
        const producto = await this.productoRepository.getProducto(idProducto);
        if (!producto) throw CustomError.notFound('El producto no fue encontrado');
        await this.productoRepository.delete(producto.getIdProducto());
    }
}