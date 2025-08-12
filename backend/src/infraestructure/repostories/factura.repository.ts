import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { Factura } from "../../domain/entities/factura.entity";
import { FacturaPrismaMapper } from "../mappers/factura-prisma.mapper";

@Injectable()
export class facturaRepository implements IFacturaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(factura: Factura): Promise<number> {
    const facturaData = await this.prisma.factura.create({
      data: {
        fecha: factura.getFecha(),
        prrecioFinal: factura.getPrecioFinal(),
        idCompra: factura.getIdCompra(),
        idVenta: factura.getIdVenta(),
      },
    });
    return Number(facturaData.idCompra);
  }

  public async getFactura(idFactura: number): Promise<Factura | null> {
    const facturaPrisma = await this.prisma.factura.findUnique({
      where: { id: idFactura },
    });
    if (!facturaPrisma) return null;
    return FacturaPrismaMapper.fromPrismaToEntity(facturaPrisma);
  }

  public async getAll(): Promise<Factura[]> {
    const facturasPrisma = this.prisma.factura.findMany();
    return FacturaPrismaMapper.fromPrismaArrayToEntity(facturasPrisma);
  }

  public async delete(idFactura: number): Promise<void> {
    await this.prisma.factura.delete({
      where: { id: idFactura },
    });
  }
}