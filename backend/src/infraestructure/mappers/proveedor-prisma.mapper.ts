import { Proveedor as proveedorPrisma } from "../prisma/generated/client";
import { Proveedor } from "../../domain/entities/proveedor.entity";

export class ProveedorPrismaMapper {
    public static fromPrismaToEntity(proveedor: proveedorPrisma): Proveedor {
        const{
            id,
            nombre,
            apellido,
            contacto,
            razonSocial,
            telefono,
            email,
        } = proveedor;
        return new Proveedor(
            id, 
            nombre,
            apellido,
            contacto,
            razonSocial,
            telefono,
            email,
        );
    }

    public static fromPrismaArrayToEntity(
        proveedor: Array<proveedorPrisma>
    ): Proveedor[] {
        return proveedor.map((proveedor) => this.fromPrismaToEntity(proveedor));
    }
}