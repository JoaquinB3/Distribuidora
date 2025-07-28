import { postFacturaValidation } from "../../validations/factura/postFactura.validation";

export class UpdateFacturaDto {
    private constructor(
        public fecha: Date,
        public precioFinal: number,
    ) {}

    public static create(factura: any): [string?, UpdateFacturaDto?] {
        const facturaValidation = postFacturaValidation(factura);

        if (!facturaValidation.success) {
            return [JSON.stringify(facturaValidation.error.message)];
        }

        const data = facturaValidation.data;

        return [
            undefined,
            new UpdateFacturaDto(
                data.fecha,
                data.precioFinal
            )
        ];
    }
}