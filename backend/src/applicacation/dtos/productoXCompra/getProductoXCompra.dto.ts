import { ProductoXCompra } from "../../../domain/entities/productoXCompra.entity";

export class GetProductoXCompraDto {
    private constructor (
        public idProductoXCompra: number,
        public cantidad: number,
        public idProducto: number,
        public idCompra: number,
    ) {} 

    public static create(productoXCompra: ProductoXCompra): GetProductoXCompraDto {
        return new GetProductoXCompraDto(
            productoXCompra.getIdProductoXCompra(),
            productoXCompra.getCantidad(),
            productoXCompra.getIdProducto(),
            productoXCompra.getIdCompra()
        );
    }
}
