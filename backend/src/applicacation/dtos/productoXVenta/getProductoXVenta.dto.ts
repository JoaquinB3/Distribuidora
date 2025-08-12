import { Producto } from "../../../domain/entities/producto.entity";
import { ProductoXVenta } from "../../../domain/entities/productoXVenta.entity";
import { Venta } from "../../../domain/entities/venta.entity";

export class GetProductoXVentaDto {
    private constructor (
        public idProductoXVenta: number,
        public idProducto: number,
        public idVenta: number,
        public cantidad: number,
    ) {} 

    public static create(productoXVenta: ProductoXVenta): GetProductoXVentaDto {
        return new GetProductoXVentaDto(
            productoXVenta.getIdProductoXVenta(),
            productoXVenta.getIdProducto(),
            productoXVenta.getIdVenta(),
            productoXVenta.getCantidad(),
        );
    }
}