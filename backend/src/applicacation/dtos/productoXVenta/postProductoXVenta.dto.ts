import { postProductoXVentaValidation } from "../../validations/productoXVenta/postProductoXVenta.validation";

export class PostProductoXVentaDto {
    private constructor(
        public idProducto: number,
        public idVenta: number,
        public cantidad: number,
    ) {}

    public static create(productoXVenta: any): [string?, PostProductoXVentaDto?] {
        const productoXVentaValidation = postProductoXVentaValidation(productoXVenta);

        if (!productoXVentaValidation.success) {
            return [JSON.stringify(productoXVentaValidation.error.message)];
        }

        const data = productoXVentaValidation.data;

        return [
            undefined,
            new PostProductoXVentaDto(
                data.idProducto,
                data.idVenta,
                data.cantidad,
            )
        ];
    }
}