import { Compra } from "../../domain/entities/compra.entity";
import { ICompraRepository } from "../../domain/repositories/compra.interface";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { IMetodoPagoRepository } from "../../domain/repositories/metodoPago.interface";
import { IProveedorRepository } from "../../domain/repositories/proveedor.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostCompraDto } from "../dtos/compra/postCompra.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class CompraService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.ICompraRepository) private readonly compraRepository: ICompraRepository,
        @Inject(REPOSITORIES_TOKENS.IMetodoPagoRepository) private readonly metodoPagoRepository: IMetodoPagoRepository,
        @Inject(REPOSITORIES_TOKENS.IFacturaRepository) private readonly facturaRepository: IFacturaRepository,
        @Inject(REPOSITORIES_TOKENS.IProveedorRepository) private readonly proveedorRepository: IProveedorRepository,
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

    public async create(compra: PostCompraDto): Promise<number> {

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

        await this.compraRepository.create(newCompra)
        return newCompra.getIdCompra();
    }

    public async delete(idCompra: number): Promise<void> {
        const compra = await this.compraRepository.getCompra(idCompra);
        if (!compra) throw CustomError.notFound('La compra no fue encontrado');
        await this.compraRepository.delete(compra.getIdCompra());
    }
}

