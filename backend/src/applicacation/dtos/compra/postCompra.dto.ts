import { postCompraValidation } from "../../validations/compra/postCompra.validation";
import { PostFacturaDto } from "../factura/postFactura.dto";
import { PostMetodoPagoDto } from "../metodoPago/postMetodoPago.dto";
import { PostProveedorDto } from "../proveedor/postProveedor.dto";

export class PostCompraDto {
    private constructor (
        public fechaCompra: Date,
        public monto: number,
        public idMetodoPago: number,
        public idProveedor: number, 
    ) {}

    public static create(compra: any): [string?, PostCompraDto?] {
        const compraValidation = postCompraValidation(compra);

        if (!compraValidation.success) {
            return [JSON.parse(compraValidation.error.message)];
        }

        return [undefined, new PostCompraDto(
            compraValidation.data.fechaCompra,
            compraValidation.data.monto,
            compraValidation.data.idMetodoPago,
            compraValidation.data.idProveedor
        )];
    }
}