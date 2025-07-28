import { postMarcaValidation } from "../../validations/marca/postMarca.validation";

export class PostMarcaDto {
    private constructor(
        public nombre: string
    ) {}

    public static create(marca: any): [string?, PostMarcaDto?] {
        const marcaValidation = postMarcaValidation(marca);
    
        if (!marcaValidation.success) {
            return [JSON.stringify(marcaValidation.error.message)];
        }

        const data = marcaValidation.data;

        return [
            undefined,
            new PostMarcaDto(
                data.nombre,
            )
        ];
    }
}