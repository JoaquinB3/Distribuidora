import { Factura } from "../../domain/entities/factura.entity";
import { Factura as facturaPrisma } from "../prisma/generated/client";

export class FacturaPrismaMapper {
    public static fromPrismaToEntity(factura: facturaPrisma): Factura {
        const{
            id,
            fecha,
            precioFinal,
            ventaId,
            compraId,
        } = factura;
        return new Factura(
            id,
            fecha,
            precioFinal,
            ventaId,
            compraId,
        );
    }

    public static fromPrismaArrayToEntity(
        factura: Array<facturaPrisma>
    ): Factura[] {
        return factura.map((factura) => this.fromPrismaToEntity(factura));
    }
}