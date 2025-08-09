import { MetodoPago as metodoPagoPrisma } from "../prisma/generated/client";
import { MetodoPago } from "../../domain/entities/metodoPago.entity";

export class MetodoPagoPrismaMapper {
    public static fromPrismaToEntity(metodoPago: metodoPagoPrisma): MetodoPago {
        const{
            id,
            nombre,
        } = metodoPago;
        return new MetodoPago(
            id, 
            nombre,
        );
    }

    public static fromPrismaArrayToEntity(
        metodoPago: Array<metodoPagoPrisma>
    ): MetodoPago[] {
        return metodoPago.map((metodoPago) => this.fromPrismaToEntity(metodoPago));
    }
}