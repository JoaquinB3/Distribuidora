import { Compra } from "../../../domain/entities/compra.entity";

export class GetCompraDto {
    private constructor(
        public idCompra: number,
        public fechaCompra: Date,
        public monto: number,
        public metodoPago: string,
        public proveedor: number,
    ) {}

    public static create(compra: Compra): GetCompraDto {
        return new GetCompraDto(
            compra.getIdCompra(),
            compra.getFechaCompra(),
            compra.getMonto(),
            compra.getMetodoPago(),
            compra.getIdProveedor(),
        )
    }
}