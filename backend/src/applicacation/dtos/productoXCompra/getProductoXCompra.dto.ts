import { Compra } from "../../../domain/entities/compra.entity";
import { Producto } from "../../../domain/entities/producto.entity";
import { ProductoXCompra } from "../../../domain/entities/productoXCompra.entity";

export class GetProductoXCompraDto {
    private constructor (
        public idProductoXCompra: number,
        public cantidad: number,
        public producto: Producto,
        public compra: Compra,
    ) {} 

    public static create(productoXCompra: ProductoXCompra): GetProductoXCompraDto {
        return new GetProductoXCompraDto(
            productoXCompra.getIdProductoXCompra(),
            productoXCompra.getCantidad(),
            productoXCompra.getProducto(),
            productoXCompra.getCompra()
        );
    }
}
