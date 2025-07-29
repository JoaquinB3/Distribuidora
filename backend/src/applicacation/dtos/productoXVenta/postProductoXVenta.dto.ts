import { postProductoXVentaValidation } from "../../validations/productoXVenta/postProductoXVenta.validation";
import { PostProductoDto } from "../producto/postProducto.dto";
import { PostVentaDto } from "../venta/postVenta.dto";

export class PostProductoXVentaDto {
    private constructor(
        public cantidad: number,
        public producto: PostProductoDto,
        public venta: PostVentaDto,
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
                data.cantidad,
                data.producto,
                data.venta,
            )
        ];
    }
}