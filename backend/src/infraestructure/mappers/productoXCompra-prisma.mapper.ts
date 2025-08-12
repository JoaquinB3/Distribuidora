import { ProductoXCompra } from "../../domain/entities/productoXCompra.entity";
import { ProductoXCompra as productoXCompraPrisma } from "../prisma/generated/client";

export class ProductoXCompraPrismaMapper {
    public static fromPrismaToEntity(productoXCompra: productoXCompraPrisma): ProductoXCompra {
        const{
            id,
            productoId,
            compraId,
            cantidad,
        } = productoXCompra;
        return new ProductoXCompra(
            id,
            productoId,
            compraId,
            cantidad,
        );
    }

    public static fromPrismaArrayToEntity(
        productoXCompra: Array<productoXCompraPrisma>
    ): ProductoXCompra[] {
        return productoXCompra.map((productoXCompra) => this.fromPrismaToEntity(productoXCompra));
    }
}