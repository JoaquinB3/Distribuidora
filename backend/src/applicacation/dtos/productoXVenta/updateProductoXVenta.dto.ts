import { postProductoXVentaValidation } from "../../validations/productoXVenta/postProductoXVenta.validation";
import { PostProductoDto } from "../producto/postProducto.dto";
import { PostVentaDto } from "../venta/postVenta.dto";

export class UpdateProductoXVentaDto {
    private constructor(
        public cantidad: number,
        public producto: PostProductoDto,
        public venta: PostVentaDto,
    ) {}

    public static create(productoXVenta: any): [string?, UpdateProductoXVentaDto?] {
        const productoXVentaValidation = postProductoXVentaValidation(productoXVenta);

        if (!productoXVentaValidation.success) {
            return [JSON.stringify(productoXVentaValidation.error.message)];
        }

        const data = productoXVentaValidation.data;

        return [
            undefined,
            new UpdateProductoXVentaDto(
                data.cantidad,
                data.producto,
                data.venta,
            )
        ];
    }
}