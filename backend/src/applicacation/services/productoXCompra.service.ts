import { ProductoXCompra } from "../../domain/entities/productoXCompra.entity";
import { ICompraRepository } from "../../domain/repositories/compra.interface";
import { IProductoRepository } from "../../domain/repositories/producto.interface";
import { IProductoXCompraRepository } from "../../domain/repositories/productoXCompra.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostProductoXCompraDto } from "../dtos/productoXCompra/postProductoXCompra.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ProductoXCompraService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.IProductoXCompraRepository) private readonly productoXCompraRepository: IProductoXCompraRepository,
        @Inject(REPOSITORIES_TOKENS.IProductoRepository) private readonly productoRepository: IProductoRepository,
        @Inject(REPOSITORIES_TOKENS.ICompraRepository) private readonly compraRepository: ICompraRepository,
    ) {}
    
    public async getProductoXCompra(idProductoXCompra: number): Promise<ProductoXCompra | null> {
        const productoXCompra = await  this.productoXCompraRepository.getProductoXCompra(idProductoXCompra);

        if (!productoXCompra) throw CustomError.notFound('No se encontro un productoXCompra con ese id');
        return productoXCompra;
    }
    
    public async getAll(): Promise<ProductoXCompra[]> {
        const productoXCompras = await this.productoXCompraRepository.getAll();
        if (productoXCompras.length === 0) throw CustomError.notFound('No se encontraron productosXCompras');
        return productoXCompras;
    }
    
    public async create(productosXCompra: PostProductoXCompraDto): Promise<number> {
        const producto = await this.productoRepository.getProducto(productosXCompra.idProducto);
        const compra = await this.compraRepository.getCompra(productosXCompra.idCompra);
        
        if (!producto) throw CustomError.notFound('El producto no existe');
        if (!compra) throw CustomError.notFound('La compra no existe');

        const newProductoXCompra = new ProductoXCompra(
            0,
            productosXCompra.cantidad,
            producto,
            compra,
        );

        await this.productoXCompraRepository.create(newProductoXCompra)
        return newProductoXCompra.getIdProductoXCompra();
    }

    public async delete(idProductoXCompra: number): Promise<void> {
        const productoXCompra = await this.productoXCompraRepository.getProductoXCompra(idProductoXCompra);
        if (!productoXCompra) throw CustomError.notFound('El productoXCompra no fue encontrada');
        await this.productoXCompraRepository.delete(productoXCompra.getIdProductoXCompra());
    } 
}