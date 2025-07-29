import { postCompraValidation } from "../../validations/compra/postCompra.validation";
import { PostFacturaDto } from "../factura/postFactura.dto";
import { PostMetodoPagoDto } from "../metodoPago/postMetodoPago.dto";
import { PostProveedorDto } from "../proveedor/postProveedor.dto";

export class UpdateCompraDto {
    private constructor(
        public fechaCompra: Date,
        public monto: number,
        public metodoPago: PostMetodoPagoDto,
        public factura: PostFacturaDto,
        public proveedor: PostProveedorDto, 
    ) {}

    public static create(compra: any): [string?, UpdateCompraDto?] {
        const compraValidation = postCompraValidation(compra);

        if (!compraValidation.success) {
            return [JSON.parse(compraValidation.error.message)];
        }

        return [undefined, new UpdateCompraDto(
            compraValidation.data.fechaCompra,
            compraValidation.data.monto,
            compraValidation.data.metodoPago,
            compraValidation.data.factura,
            compraValidation.data.proveedor,
        )];
    }
}