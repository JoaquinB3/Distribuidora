import { Cliente } from "../../../domain/entities/cliente.entity";
import { Factura } from "../../../domain/entities/factura.entity";
import { MetodoPago } from "../../../domain/entities/metodoPago.entity";
import { Venta } from "../../../domain/entities/venta.entity";

export class GetVentaDto {
    private constructor(
        public idVenta: number,
        public fechaVenta: Date,
        public monto: number,
        public metodoPago: string,
        public cliente: number,
    ) {}

    public static create(venta: Venta): GetVentaDto {
        return new GetVentaDto(
            venta.getIdVenta(),
            venta.getFechaVenta(),
            venta.getMonto(),
            venta.getMetodoPago(),
            venta.getCliente(),
        )
    }
}