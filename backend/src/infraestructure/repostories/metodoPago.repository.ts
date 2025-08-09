import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IMetodoPagoRepository } from "../../domain/repositories/metodoPago.interface";
import { MetodoPago } from "../../domain/entities/metodoPago.entity";
import { MetodoPagoPrismaMapper } from "../mappers/metetdoPago-prisma.mapper";

@Injectable()
export class MetodoPagoRepository implements IMetodoPagoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(metodoPago: MetodoPago): Promise<number> {
    const metodoPagoData = await this.prisma.metodoPago.create({
      data: {
        nombre: metodoPago.getNombre(),
      },
    });
    return Number(metodoPagoData.idMetodoPago);
  }

  public async getMetodoPago(idMetodoPago: number): Promise<MetodoPago | null> {
    const metodoPagoPrisma = await this.prisma.metodoPago.findUnique({
      where: { id: idMetodoPago },
    });
    if (!metodoPagoPrisma) return null;
    return MetodoPagoPrismaMapper.fromPrismaToEntity(metodoPagoPrisma);
  }

  public async getAll(): Promise<MetodoPago[]> {
    const metodoPagosPrisma = this.prisma.metodoPago.findMany();
    return MetodoPagoPrismaMapper.fromPrismaArrayToEntity(metodoPagosPrisma);
  }

  public async update(metodoPago: MetodoPago): Promise<number> {
    const metodoPagoUpdatePrisma = await this.prisma.metodoPago.update({
      where: { id: metodoPago.getIdMetodoPago() },
      data: {
        nombre: metodoPago.getNombre(),
      },
    });
    return Number(metodoPagoUpdatePrisma.id);
  }

  public async delete(idMetodoPago: number): Promise<void> {
    await this.prisma.metodoPago.delete({
      where: { id: idMetodoPago },
    });
  }
}
