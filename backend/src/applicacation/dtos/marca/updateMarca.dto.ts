import { postMarcaValidation } from "../../validations/marca/postMarca.validation";

export class UpdateMarcaDto {
    private constructor(
        public id: number,
        public nombre: string,
    ) {}

    public static create(marca: any, id: number): [string?, UpdateMarcaDto?] {
        const marcaValidation = postMarcaValidation(marca);

        if (!marcaValidation.success) {
            return [JSON.stringify(marcaValidation.error.message)];
        }

        const data = marcaValidation.data;

        return [
            undefined,
            new UpdateMarcaDto(
                id,
                data.nombre,
            )
        ];
    }
}