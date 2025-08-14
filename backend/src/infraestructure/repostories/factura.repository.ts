import { Injectable } from "../dependencies/injectable.dependency";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { Factura } from "../../domain/entities/factura.entity";
import { FacturaPrismaMapper } from "../mappers/factura-prisma.mapper";
import { PrismaClient } from "../prisma/generated/client";

@Injectable()
export class facturaRepository implements IFacturaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(factura: Factura): Promise<number> {
    const data: any = {
      fecha: factura.getFecha(),
      precioFinal: factura.getPrecioFinal(),
    };

    if (factura.getIdCompra() !== null) {
      data.compra = {
        connect: { id: factura.getIdCompra() },
      };
    }

    if (factura.getIdVenta() !== null) {
      data.venta = {
        connect: { id: factura.getIdVenta() },
      };
    }

    const facturaData = await this.prisma.factura.create({ data });
    return Number(facturaData.id);
  }

  public async getFactura(idFactura: number): Promise<Factura | null> {
    const facturaPrisma = await this.prisma.factura.findUnique({
      where: { id: idFactura },
    });
    if (!facturaPrisma) return null;
    return FacturaPrismaMapper.fromPrismaToEntity(facturaPrisma);
  }

  public async getAll(): Promise<Factura[]> {
    const facturasPrisma = await this.prisma.factura.findMany();
    return FacturaPrismaMapper.fromPrismaArrayToEntity(facturasPrisma);
  }

  public async delete(idFactura: number): Promise<void> {
    await this.prisma.factura.delete({
      where: { id: idFactura },
    });
  }
}