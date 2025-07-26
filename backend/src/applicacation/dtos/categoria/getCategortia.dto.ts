import { Categoria } from "../../../domain/entities/categoria.entity";

export class GetCategoriaDto {
    private constructor (
        public idCategoria: number,
        public nombre: string,
    ) {} 

    public static create(categoria: Categoria): GetCategoriaDto {
        return new GetCategoriaDto(
            categoria.getIdCategoria(),
            categoria.getNombre()
        );
    }
}