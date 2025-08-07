import { postFacturaValidation } from "../../validations/factura/postFactura.validation";

export class PostFacturaDto {
    private constructor(
        public fecha: Date,
        public precioFinal: number,
        public idCompra: number | null = null,
        public idVenta: number | null = null,
    ) {}

    public static create(factura: any): [string?, PostFacturaDto?] {
        const facturaValidation = postFacturaValidation(factura);

        if (!facturaValidation.success) {
            return [JSON.stringify(facturaValidation.error.message)];
        }

        const data = facturaValidation.data;

        return [
            undefined,
            new PostFacturaDto(
                data.fecha,
                data.precioFinal,
                data.idCompra,
                data.idVenta
            )
        ];
    }
}