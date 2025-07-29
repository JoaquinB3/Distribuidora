import { postProductoValidation } from "../../validations/producto/postProducto.validation";
import { PostCategoriaDto } from "../categoria/postCategoria.dto";
import { PostMarcaDto } from "../marca/postMarca.dto";

export class UpdateProductoDto {
    private constructor (
        public codigo: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public idMarca: PostMarcaDto,
        public idCategoria: PostCategoriaDto,
    ) {}

    public static create(producto: any): [string?, UpdateProductoDto?] {
        const productoValidation = postProductoValidation(producto);

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