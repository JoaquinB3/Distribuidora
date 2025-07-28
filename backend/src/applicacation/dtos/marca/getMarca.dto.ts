import { Marca } from "../../../domain/entities/marca.entity";

export class GetMarcaDto {
    private constructor (
        public idMarca: number,
        public nombre: string,
    ) {} 

    public static create(marca: Marca): GetMarcaDto {
        return new GetMarcaDto(
            marca.getIdMarca(),
            marca.getNombre(),
        );
    }
}