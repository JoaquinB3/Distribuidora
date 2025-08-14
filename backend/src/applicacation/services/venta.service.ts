import { Venta } from "../../domain/entities/venta.entity";
import { IClienteRepository } from "../../domain/repositories/cliente.interface";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { IMetodoPagoRepository } from "../../domain/repositories/metodoPago.interface";
import { IVentaRepository } from "../../domain/repositories/venta.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostVentaDto } from "../dtos/venta/postVenta.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class VentaService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.IVentaRepository) private readonly ventaRepository: IVentaRepository,
        @Inject(REPOSITORIES_TOKENS.IMetodoPagoRepository) private readonly metodoPagoRepository: IMetodoPagoRepository,
        @Inject(REPOSITORIES_TOKENS.IFacturaRepository) private readonly facturaRepository: IFacturaRepository,
        @Inject(REPOSITORIES_TOKENS.IClienteRepository) private readonly clienteRepository: IClienteRepository,
    ) {}

    public async getVenta(idVenta: number): Promise<Venta | null> {
            const venta = await this.ventaRepository.getVenta(idVenta);
    
            if(!venta) throw CustomError.notFound('No se encontro una venta con ese id');
            return venta;
        }
    
    public async getAll(): Promise<Venta[]> {
        const ventas = await this.ventaRepository.getAll();
        if (ventas.length === 0) throw CustomError.notFound('No se encontraron ventas');
        return ventas;
    }

    public async create(venta: PostVentaDto): Promise<number> {

        const metodoPago = await this.metodoPagoRepository.getMetodoPago(venta.idMetodoPago);
        const cliente = await this.clienteRepository.getCliente(venta.idCliente);

        if (!metodoPago) throw CustomError.notFound('El metodo de pago no existe');
        if (!cliente) throw CustomError.notFound('El cliente no existe');

        const newVenta = new Venta(
            0,
            venta.fechaVenta,
            venta.monto,
            metodoPago.getNombre(),
            cliente.getIdCliente(),
        );

        await this.ventaRepository.create(newVenta)
        return newVenta.getIdVenta();
    }

    public async delete(idVenta: number): Promise<void> {
        const venta = await this.ventaRepository.getVenta(idVenta);
        if (!venta) throw CustomError.notFound('La venta no fue encontrado');
        await this.ventaRepository.delete(venta.getIdVenta());
    }
}