import { postCategoriaValidation } from "../../validations/categoria/postCategoria.validation";

export class PostCategoriaDto {
    private constructor(
        public nombre: string,
    ) {}

    public static create(categoria: any): [string?, PostCategoriaDto?] {
        const categoriaValidation = postCategoriaValidation(categoria);

        if (!categoriaValidation.success) {
            return [JSON.stringify(categoriaValidation.error.message)];
        }

        const data = categoriaValidation.data;

        return [
            undefined,
            new PostCategoriaDto(
                data.nombre,
            )
        ];
    }
}