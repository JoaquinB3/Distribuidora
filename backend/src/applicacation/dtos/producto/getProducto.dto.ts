import { Categoria } from "../../../domain/entities/categoria.entity";
import { Marca } from "../../../domain/entities/marca.entity";
import { Producto } from "../../../domain/entities/producto.entity";

export class GetProductoDto {
    private constructor(
        public idProducto: number,
        public codigo: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public idMarca: Marca,
        public idCategoria: Categoria,
    ) {}

    public static create(producto: Producto): GetProductoDto {
        return new GetProductoDto(
            producto.getIdProducto(),
            producto.getCodigo(),
            producto.getNombre(),
            producto.getDescripcion(),
            producto.getPrecio(),
            producto.getStock(),
            producto.getIdMarca(),
            producto.getIdCategoria(),
        )
    }
}