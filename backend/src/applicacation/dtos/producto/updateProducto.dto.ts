import { putProductoValidation } from "../../validations/producto/postProducto.validation";

export class UpdateProductoDto {
    private constructor (
        public codigo?: number,
        public nombre?: string,
        public descripcion?: string,
        public precio?: number,
        public stock?: number,
        public idMarca?: number,
        public idCategoria?: number,
    ) {}

    public static create(producto: any, id: number): [string?, UpdateProductoDto?] {
        const productoValidation = putProductoValidation(producto);

        if (!productoValidation.success) {
            return [JSON.parse(productoValidation.error.message)];
        }

        return [undefined, new UpdateProductoDto(
            productoValidation.data.codigo,
            productoValidation.data.nombre,
            productoValidation.data.descripcion,
            productoValidation.data.precio,
            productoValidation.data.stock,
            productoValidation.data.idMarca,
            productoValidation.data.idCategoria,
        )];
    }
}