import { ProductoXVenta } from "../../domain/entities/productoXVenta.entity";
import { ProductoXVenta as productoXVentaPrisma } from "../prisma/generated/client";

export class ProductoXVentaPrismaMapper {
    public static fromPrismaToEntity(productoXVenta: productoXVentaPrisma): ProductoXVenta {
        const{
            id,
            productoId,
            ventaId,
            cantidad,
        } = productoXVenta;
        return new ProductoXVenta(
            id,
            productoId,
            ventaId,
            cantidad,
        );
    }

    public static fromPrismaArrayToEntity(
        productoXVenta: Array<productoXVentaPrisma>
    ): ProductoXVenta[] {
        return productoXVenta.map((productoXVenta) => this.fromPrismaToEntity(productoXVenta));
    }
}