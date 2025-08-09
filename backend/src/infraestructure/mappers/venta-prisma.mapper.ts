import { Venta as ventaPrisma } from "../prisma/generated/client";
import { Venta } from "../../domain/entities/venta.entity";

export class VentaPrismaMapper {
    public static fromPrismaToEntity(venta: ventaPrisma): Venta {
        const{
            id,
            fecha,
            monto,
            metodoPagoId,
            clienteId,
        } = venta;
        return new Venta(
            id,
            fecha,
            monto,
            metodoPagoId,
            clienteId,
        );
    }

    public static fromPrismaArrayToEntity(
        venta: Array<ventaPrisma>
    ): Venta[] {
        return venta.map((venta) => this.fromPrismaToEntity(venta));
    }
}