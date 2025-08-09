import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IClienteRepository } from "../../domain/repositories/cliente.interface";
import { Cliente } from "../../domain/entities/cliente.entity";
import { ClientePrismaMapper } from "../mappers/cliente-prisma.mapper";

@Injectable()
export class ClienteRepository implements IClienteRepository     {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(cliente: Cliente): Promise<number> {
    const clienteData = await this.prisma.cliente.create({
      data: {
        nombre: cliente.getNombre(),
        apellido: cliente.getApellido(),
        contacto: cliente.getContacto(),
        razon_social: cliente.getRazonSocial(),
        telefono: cliente.getTelefono(),
        mail: cliente.getMail(),
      },
    });
    return Number(clienteData.idCliente);
  }

  public async getCliente(idCliente: number): Promise<Cliente | null> {
    const clientePrisma = await this.prisma.cliente.findUnique({
      where: { id: idCliente },
    });
    if (!clientePrisma) return null;
    return ClientePrismaMapper.fromPrismaToEntity(clientePrisma);
  }

  public async getAll(): Promise<Cliente[]> {
    const clientesPrisma = this.prisma.cliente.findMany();
    return ClientePrismaMapper.fromPrismaArrayToEntity(clientesPrisma);
  }

  public async getClientePorMail(
    mailCliente: string
  ): Promise<Cliente | null> {
    const clientePrisma = this.prisma.cliente.findUnique({
      where: { mail: mailCliente },
    });
    if (!clientePrisma) return null;
    return ClientePrismaMapper.fromPrismaToEntity(clientePrisma);
  }

  public async update(cliente: Cliente): Promise<number> {
    const clienteUpdatePrisma = await this.prisma.cliente.update({
      where: { id: cliente.getIdCliente() },
      data: {
        nombre: cliente.getNombre(),
        apellido: cliente.getApellido(),
        contacto: cliente.getContacto(),
        razon_social: cliente.getRazonSocial(),
        telefono: cliente.getTelefono(),
        mail: cliente.getMail(),
      },
    });
    return Number(clienteUpdatePrisma.idCliente);
  }

  public async delete(idCliente: number): Promise<void> {
    await this.prisma.cliente.delete({
      where: { id: idCliente },
    });
  }
}