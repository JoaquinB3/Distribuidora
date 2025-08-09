import { Marca as marcaPrisma } from "../prisma/generated/client";
import { Marca } from "../../domain/entities/marca.entity";

export class MarcaPrismaMapper {
    public static fromPrismaToEntity(marca: marcaPrisma): Marca {
        const{
            id,
            nombre,
        } = marca;
        return new Marca(
            id, 
            nombre,
        );
    }

    public static fromPrismaArrayToEntity(
        marca: Array<marcaPrisma>
    ): Marca[] {
        return marca.map((marca) => this.fromPrismaToEntity(marca));
    }
}