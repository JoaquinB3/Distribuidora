import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { ICompraRepository } from "../../domain/repositories/compra.interface";
import { Compra } from "../../domain/entities/compra.entity";
import { CompraPrismaMapper } from "../mappers/compra-prisma.mapper";

@Injectable()
export class CompraRepository implements ICompraRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(compra: Compra): Promise<number> {
    const compraData = await this.prisma.compra.create({
      data: {
        fechaCompra: compra.getFechaCompra(),
        monto: compra.getMonto(),
        metodoPago: compra.getMetodoPago(),
        proveedor: compra.getProveedor(),
      },
    });
    return Number(compraData.idCompra);
  }

  public async getCompra(idCompra: number): Promise<Compra | null> {
    const compraPrisma = await this.prisma.compra.findUnique({
      where: { id: idCompra },
    });
    if (!compraPrisma) return null;
    return CompraPrismaMapper.fromPrismaToEntity(compraPrisma);
  }

  public async getAll(): Promise<Compra[]> {
    const comprasPrisma = this.prisma.compra.findMany();
    return CompraPrismaMapper.fromPrismaArrayToEntity(comprasPrisma);
  }

  public async delete(idCompra: number): Promise<void> {
    await this.prisma.compra.delete({
      where: { id: idCompra },
    });
  }
}
