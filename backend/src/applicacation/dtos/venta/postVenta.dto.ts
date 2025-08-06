import { postVentaValidation } from "../../validations/venta/postVenta.validation";

export class PostVentaDto {
    private constructor (
        public fechaVenta: Date,
        public monto: number,
        public idMetodoPago: number,
        public idFactura: number,
        public idCliente: number, 
    ) {}

    public static create(venta: any): [string?, PostVentaDto?] {
        const ventaValidation = postVentaValidation(venta);

        if (!ventaValidation.success) {
            return [JSON.parse(ventaValidation.error.message)];
        }

        return [undefined, new PostVentaDto(
            ventaValidation.data.fechaVenta,
            ventaValidation.data.monto,
            ventaValidation.data.idMetodoPago,
            ventaValidation.data.idFactura,
            ventaValidation.data.idCliente,
        )];
    }
}