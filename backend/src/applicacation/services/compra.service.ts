import id from "zod/v4/locales/id.cjs";
import { Compra } from "../../domain/entities/compra.entity";
import { ICompraRepository } from "../../domain/repositories/compra.interface";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { IMetodoPagoRepository } from "../../domain/repositories/metodoPago.interface";
import { IProveedorRepository } from "../../domain/repositories/proveedor.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostCompraDto } from "../dtos/compra/postCompra.dto";
import { PostFacturaDto } from "../dtos/factura/postFactura.dto";
import { PostProductoXCompraDto } from "../dtos/productoXCompra/postProductoXCompra.dto";
import { CustomError } from "../errors/custom.errors";
import { FacturaService } from "./factura.service";
import { ProductoXCompraService } from "./productoXCompra.service";

@Injectable()
export class CompraService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.ICompraRepository) private readonly compraRepository: ICompraRepository,
        @Inject(REPOSITORIES_TOKENS.IMetodoPagoRepository) private readonly metodoPagoRepository: IMetodoPagoRepository,
        @Inject(REPOSITORIES_TOKENS.IFacturaRepository) private readonly facturaRepository: IFacturaRepository,
        @Inject(REPOSITORIES_TOKENS.IProveedorRepository) private readonly proveedorRepository: IProveedorRepository,
                private readonly productoXCompraService: ProductoXCompraService,
        private readonly facturaService: FacturaService
    ) {}

    public async getCompra(idCompra: number): Promise<Compra | null> {
            const compra = await this.compraRepository.getCompra(idCompra);
    
            if(!compra) throw CustomError.notFound('No se encontro una compra con ese id');
            return compra;
        }
    
    public async getAll(): Promise<Compra[]> {
        const compras = await this.compraRepository.getAll();
        if (compras.length === 0) throw CustomError.notFound('No se encontraron compras');
        return compras;
    }

    public async create(
        compra: PostCompraDto, 
        productos: {idProducto: number, cantidad: number}[],
    ): Promise<number> {

        const metodoPago = await this.metodoPagoRepository.getMetodoPago(compra.idMetodoPago);
        const proveedor = await this.proveedorRepository.getProveedor(compra.idProveedor);

        if (!metodoPago) throw CustomError.notFound('El metodo de pago no existe');
        if (!proveedor) throw CustomError.notFound('El proveedor no existe');

        const newCompra = new Compra(
            0,
            compra.fechaCompra,
            compra.monto,
            metodoPago.getNombre(),
            proveedor.getIdProveedor(),
        );

        const newDbCompraId = await this.compraRepository.create(newCompra);

        //Creo ProductXCompra para cada produto
        for (const prod of productos) {
            const [error, productoXCompraDto] = PostProductoXCompraDto.create({
                cantidad: prod.cantidad,
                idProducto: prod.idProducto,
                idCompra: newDbCompraId,
            });

            if (error) throw CustomError.notFound(error);

            await this.productoXCompraService.create(productoXCompraDto!)
        }

        //Creo la factura asociada a la compra
        const [error, facturaDto] = PostFacturaDto.create({
            fecha: compra.fechaCompra.toISOString(),
            precioFinal: compra.monto,
            idCompra: newDbCompraId,
            idVenta: null,
        }); 

        if (error) {
            throw CustomError.notFound(error);
        }

        await this.facturaService.create(facturaDto!);

        return newDbCompraId;
    }

    public async delete(idCompra: number): Promise<void> {
        const compra = await this.compraRepository.getCompra(idCompra);
        if (!compra) throw CustomError.notFound('La compra no fue encontrado');
        await this.compraRepository.delete(compra.getIdCompra());
    }
}

