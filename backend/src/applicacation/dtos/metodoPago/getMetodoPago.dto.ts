import { MetodoPago } from "../../../domain/entities/metodoPago.entity";

export class GetMetodoPagoDto {
    private constructor (
        public idMetodoPago: number,
        public nombre: string,
    ) {} 

    public static create(metodoPago: MetodoPago): GetMetodoPagoDto {
        return new GetMetodoPagoDto(
            metodoPago.getIdMetodoPago(),
            metodoPago.getNombre()
        );
    }
}