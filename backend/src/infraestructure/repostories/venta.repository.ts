import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { Venta } from "../../domain/entities/venta.entity";
import { IVentaRepository } from "../../domain/repositories/venta.interface";
import { VentaPrismaMapper } from "../mappers/venta-prisma.mapper";

@Injectable()
export class VentaRepository implements IVentaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(venta: Venta): Promise<number> {
    const compraData = await this.prisma.venta.create({
      data: {
        fechaVenta: venta.getFechaVenta(),
        monto: venta.getMonto(),
        metodoPago: venta.getMetodoPago(),
        cliente: venta.getCliente(),
      },
    });
    return Number(compraData.idCompra);
  }

  public async getVenta(idVenta: number): Promise<Venta | null> {
    const ventaPrisma = await this.prisma.venta.findUnique({
      where: { id: idVenta },
    });
    if (!ventaPrisma) return null;
    return VentaPrismaMapper.fromPrismaToEntity(ventaPrisma);
  }

  public async getAll(): Promise<Venta[]> {
    const ventasPrisma = this.prisma.venta.findMany();
    return VentaPrismaMapper.fromPrismaArrayToEntity(ventasPrisma);
  }

  public async delete(idVenta: number): Promise<void> {
    await this.prisma.venta.delete({
      where: { id: idVenta },
    });
  }
}