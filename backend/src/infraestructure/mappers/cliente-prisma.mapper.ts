import { Cliente as clientePrisma } from "../prisma/generated/client";
import { Cliente } from "../../domain/entities/cliente.entity";

export class ClientePrismaMapper {
    public static fromPrismaToEntity(cliente: clientePrisma): Cliente {
        const{
            id,
            nombre,
            apellido,
            contacto,
            razonSocial,
            telefono,
            email,
        } = cliente;
        return new Cliente(
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
        cliente: Array<clientePrisma>
    ): Cliente[] {
        return cliente.map((cliente) => this.fromPrismaToEntity(cliente));
    }
}