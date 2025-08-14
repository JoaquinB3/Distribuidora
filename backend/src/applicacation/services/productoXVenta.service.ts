import { ProductoXCompra } from "../../domain/entities/productoXCompra.entity";
import { ProductoXVenta } from "../../domain/entities/productoXVenta.entity";
import { IProductoRepository } from "../../domain/repositories/producto.interface";
import { IProductoXVentaRepository } from "../../domain/repositories/productoXVenta.interface";
import { IVentaRepository } from "../../domain/repositories/venta.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostProductoXCompraDto } from "../dtos/productoXCompra/postProductoXCompra.dto";
import { PostProductoXVentaDto } from "../dtos/productoXVenta/postProductoXVenta.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ProductoXVentaService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.IProductoXVentaRepository) private readonly productoXVentaRepository: IProductoXVentaRepository,
        @Inject(REPOSITORIES_TOKENS.IProductoRepository) private readonly productoRepository: IProductoRepository,
        @Inject(REPOSITORIES_TOKENS.IVentaRepository) private readonly ventaRepository: IVentaRepository,
    ) {}
    
    public async getProductoXVenta(idProductoXVenta: number): Promise<ProductoXVenta | null> {
        const productoXVenta = await  this.productoXVentaRepository.getProductoXVenta(idProductoXVenta);

        if (!productoXVenta) throw CustomError.notFound('No se encontro un productoXVenta con ese id');
        return productoXVenta;
    }
    
    public async getAll(): Promise<ProductoXVenta[]> {
        const productoXVentas = await this.productoXVentaRepository.getAll();
        if (productoXVentas.length === 0) throw CustomError.notFound('No se encontraron productosXVentas');
        return productoXVentas;
    }
    
    public async create(productosXVenta: PostProductoXVentaDto): Promise<number> {
        const producto = await this.productoRepository.getProducto(productosXVenta.idProducto);
        const venta = await this.ventaRepository.getVenta(productosXVenta.idVenta);
        
        if (!producto) throw CustomError.notFound('El producto no existe');
        if (!venta) throw CustomError.notFound('La venta no existe');

        const newProductoXVenta = new ProductoXVenta(
            0,
            productosXVenta.cantidad,
            producto.getIdProducto(),
            venta.getIdVenta(),
        );

        await this.productoXVentaRepository.create(newProductoXVenta)
        return newProductoXVenta.getIdProductoXVenta();
    }

    public async delete(idProductoXVenta: number): Promise<void> {
        const productoXVenta = await this.productoXVentaRepository.getProductoXVenta(idProductoXVenta);
        if (!productoXVenta) throw CustomError.notFound('El productoXVenta no fue encontrada');
        await this.productoXVentaRepository.delete(productoXVenta.getIdProductoXVenta());
    } 
}