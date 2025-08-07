import { postProductoXCompraValidation } from "../../validations/productoXCompra/postProductoXCompra.validation";

export class PostProductoXCompraDto {
    private constructor(
        public cantidad: number,
        public idProducto: number,
        public idCompra: number,
    ) {}

    public static create(productoXCompra: any): [string?, PostProductoXCompraDto?] {
        const productoXCompraValidation = postProductoXCompraValidation(productoXCompra);

        if (!productoXCompraValidation.success) {
            return [JSON.stringify(productoXCompraValidation.error.message)];
        }

        const data = productoXCompraValidation.data;

        return [
            undefined,
            new PostProductoXCompraDto(
                data.cantidad,
                data.idProducto,
                data.idCompra,
            )
        ];
    }
}