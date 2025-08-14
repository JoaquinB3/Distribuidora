import { Injectable } from "../dependencies/injectable.dependency";
import { IProductoXVentaRepository } from "../../domain/repositories/productoXVenta.interface";
import { ProductoXVenta } from "../../domain/entities/productoXVenta.entity";
import { ProductoXVentaPrismaMapper } from "../mappers/productoXVenta-prisma.mapper";
import { PrismaClient } from "../prisma/generated/client";

@Injectable()
export class ProductoXVentaRepository implements IProductoXVentaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(productoXVenta: ProductoXVenta): Promise<number> {
    const productoXVentaData = await this.prisma.productoXVenta.create({
      data: {
        productoId: productoXVenta.getIdProducto(),
        ventaId: productoXVenta.getIdVenta(),
        cantidad: productoXVenta.getCantidad(),
      },
    });
    return Number(productoXVentaData.id);
  }

  public async getProductoXVenta(idProductoXVenta: number): Promise<ProductoXVenta | null> {
    const productoXVentaPrisma = await this.prisma.productoXVenta.findUnique({
      where: { id: idProductoXVenta },
    });
    if (!productoXVentaPrisma) return null;
    return ProductoXVentaPrismaMapper.fromPrismaToEntity(productoXVentaPrisma);
  }

  public async getAll(): Promise<ProductoXVenta[]> {
    const productosXVentaPrisma = await this.prisma.productoXVenta.findMany();
    return ProductoXVentaPrismaMapper.fromPrismaArrayToEntity(productosXVentaPrisma);
  }

  public async update(productoXVenta: ProductoXVenta): Promise<number> {
    const productoXVentaUpdatePrisma = await this.prisma.productoXVenta.update({
      where: { id: productoXVenta.getIdProductoXVenta() },
      data: {
        productoId: productoXVenta.getIdProducto(),
        ventaId: productoXVenta.getIdVenta(),
        cantidad: productoXVenta.getCantidad(),
      },
    });
    return Number(productoXVentaUpdatePrisma.id);
  }

  public async delete(idProductoXVenta: number): Promise<void> {
    await this.prisma.productoXVenta.delete({
      where: { id: idProductoXVenta },
    });
  }
}