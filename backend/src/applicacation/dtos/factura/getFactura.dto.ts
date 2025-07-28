import { Factura } from "../../../domain/entities/factura.entity";

export class GetFacturaDto {
    private constructor (
        public idFactura: number,
        public fecha: Date,
        public precioFinal: number,
    ) {} 

    public static create(factura: Factura): GetFacturaDto {
        return new GetFacturaDto(
            factura.getIdFactura(),
            factura.getFecha(),
            factura.getPrecioFinal(),
        );
    }
}