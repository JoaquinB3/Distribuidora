import { Producto } from "../../domain/entities/producto.entity";
import { Producto as productoPrisma } from "../prisma/generated/client";

export class ProductoPrismaMapper {
    public static fromPrismaToEntity(producto: productoPrisma): Producto {
        const{
            id,
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            categoriaId,
            marcaId,
        } = producto;
        return new Producto(
            id, 
            codigo,
            nombre,
            descripcion,
            precio,
            stock,
            categoriaId,
            marcaId,
        );
    }

    public static fromPrismaArrayToEntity(
        producto: Array<productoPrisma>
    ): Producto[] {
        return producto.map((producto) => this.fromPrismaToEntity(producto));
    }
}