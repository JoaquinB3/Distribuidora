import { postVentaValidation } from "../../validations/venta/postVenta.validation";
import { PostClienteDto } from "../cliente/postCliente.dto";
import { PostFacturaDto } from "../factura/postFactura.dto";
import { PostMetodoPagoDto } from "../metodoPago/postMetodoPago.dto";

export class PostVentaDto {
    private constructor (
        public fechaVenta: Date,
        public monto: number,
        public metodoPago: PostMetodoPagoDto,
        public factura: PostFacturaDto,
        public cliente: PostClienteDto, 
    ) {}

    public static create(venta: any): [string?, PostVentaDto?] {
        const ventaValidation = postVentaValidation(venta);

        if (!ventaValidation.success) {
            return [JSON.parse(ventaValidation.error.message)];
        }

        return [undefined, new PostVentaDto(
            ventaValidation.data.fechaVenta,
            ventaValidation.data.monto,
            ventaValidation.data.metodoPago,
            ventaValidation.data.factura,
            ventaValidation.data.cliente,
        )];
    }
}