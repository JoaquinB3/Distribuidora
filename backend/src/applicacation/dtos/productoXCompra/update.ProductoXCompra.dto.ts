import { postProductoXCompraValidation } from "../../validations/productoXCompra/postProductoXCompra.validation";
import { PostCompraDto } from "../compra/postCompra.dto";
import { PostProductoDto } from "../producto/postProducto.dto";

export class UpdateProductoXCompraDto {
    private constructor(
        public cantidad: number,
        public producto: PostProductoDto,
        public compra: PostCompraDto,
    ) {}

    public static create(productoXCompra: any): [string?, UpdateProductoXCompraDto?] {
        const productoXCompraValidation = postProductoXCompraValidation(productoXCompra);

        if (!productoXCompraValidation.success) {
            return [JSON.stringify(productoXCompraValidation.error.message)];
        }

        const data = productoXCompraValidation.data;

        return [
            undefined,
            new UpdateProductoXCompraDto(
                data.cantidad,
                data.producto,
                data.compra,
            )
        ];
    }
}