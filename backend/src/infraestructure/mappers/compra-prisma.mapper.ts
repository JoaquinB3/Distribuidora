import { Compra as compraPrisma } from "../prisma/generated/client";
import { Compra } from "../../domain/entities/compra.entity";

export class CompraPrismaMapper {
    public static fromPrismaToEntity(compra: compraPrisma): Compra {
        const{
            id,
            fecha,
            monto,
            metodoPago,
            proveedorId,
        } = compra;
        return new Compra(
            id,
            fecha,
            monto,
            metodoPago,
            proveedorId,
        );
    }

    public static fromPrismaArrayToEntity(
        compra: Array<compraPrisma>
    ): Compra[] {
        return compra.map((compra) => this.fromPrismaToEntity(compra));
    }
}