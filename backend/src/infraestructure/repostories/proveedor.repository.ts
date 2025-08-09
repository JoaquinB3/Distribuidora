import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IProveedorRepository } from "../../domain/repositories/proveedor.interface";
import { Proveedor } from "../../domain/entities/proveedor.entity";
import { ProveedorPrismaMapper } from "../mappers/proveedor-prisma.mapper";

@Injectable()
export class ProveedorRepository implements IProveedorRepository     {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(proveedor: Proveedor): Promise<number> {
    const proveedorData = await this.prisma.proveedor.create({
      data: {
        nombre: proveedor.getNombre(),
        apellido: proveedor.getApellido(),
        contacto: proveedor.getContacto(),
        razon_social: proveedor.getRazonSocial(),
        telefono: proveedor.getTelefono(),
        mail: proveedor.getMail(),
      },
    });
    return Number(proveedorData.idProveedor);
  }

  public async getProveedor(idProveedor: number): Promise<Proveedor | null> {
    const proveedorPrisma = await this.prisma.proveedor.findUnique({
      where: { id: idProveedor },
    });
    if (!proveedorPrisma) return null;
    return ProveedorPrismaMapper.fromPrismaToEntity(proveedorPrisma);
  }

  public async getAll(): Promise<Proveedor[]> {
    const proveedoresPrisma = this.prisma.proveedor.findMany();
    return ProveedorPrismaMapper.fromPrismaArrayToEntity(proveedoresPrisma);
  }

  public async getProveedorPorMail(
    mailProveedor: string
  ): Promise<Proveedor | null> {
    const proveedorPrisma = this.prisma.proveedor.findUnique({
      where: { mail: mailProveedor },
    });
    if (!proveedorPrisma) return null;
    return ProveedorPrismaMapper.fromPrismaToEntity(proveedorPrisma);
  }

  public async update(proveedor: Proveedor): Promise<number> {
    const proveedorUpdatePrisma = await this.prisma.proveedor.update({
      where: { id: proveedor.getIdProveedor() },
      data: {
        nombre: proveedor.getNombre(),
        apellido: proveedor.getApellido(),
        contacto: proveedor.getContacto(),
        razon_social: proveedor.getRazonSocial(),
        telefono: proveedor.getTelefono(),
        mail: proveedor.getMail(),
      },
    });
    return Number(proveedorUpdatePrisma.idProveedor);
  }

  public async delete(idProveedor: number): Promise<void> {
    await this.prisma.proveedor.delete({
      where: { id: idProveedor },
    });
  }
}