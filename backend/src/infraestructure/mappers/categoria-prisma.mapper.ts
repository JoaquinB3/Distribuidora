import { Categoria as categoriaPrisma } from "../prisma/generated/client";
import { Categoria } from "../../domain/entities/categoria.entity";

export class CategoriaPrismaMapper {
    public static fromPrismaToEntity(categoria: categoriaPrisma): Categoria {
        const{
            id,
            nombre,
        } = categoria;
        return new Categoria(
            id, 
            nombre,
        );
    }

    public static fromPrismaArrayToEntity(
        categoria: Array<categoriaPrisma>
    ): Categoria[] {
        return categoria.map((categoria) => this.fromPrismaToEntity(categoria));
    }
}
