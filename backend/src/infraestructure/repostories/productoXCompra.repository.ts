import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IProductoXCompraRepository } from "../../domain/repositories/productoXCompra.interface";
import { ProductoXCompra } from "../../domain/entities/productoXCompra.entity";
import { ProductoXCompraPrismaMapper } from "../mappers/productoXCompra-prisma.mapper";

@Injectable()
export class ProductoXCompraRepository implements IProductoXCompraRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(productoXCompra: ProductoXCompra): Promise<number> {
    const productoXCompraData = await this.prisma.productoXCompra.create({
      data: {
        productoId: productoXCompra.getIdProducto(),
        compraId: productoXCompra.getIdCompra(),
        cantidad: productoXCompra.getCantidad(),
      },
    });
    return Number(productoXCompraData.id);
  }

  public async getProductoXCompra(idProductoXCompra: number): Promise<ProductoXCompra | null> {
    const productoXCompraPrisma = await this.prisma.productoXCompra.findUnique({
      where: { id: idProductoXCompra },
    });
    if (!productoXCompraPrisma) return null;
    return ProductoXCompraPrismaMapper.fromPrismaToEntity(productoXCompraPrisma);
  }

  public async getAll(): Promise<ProductoXCompra[]> {
    const productosXCompraPrisma = this.prisma.productoXCompra.findMany();
    return ProductoXCompraPrismaMapper.fromPrismaArrayToEntity(productosXCompraPrisma);
  }

  public async update(productoXCompra: ProductoXCompra): Promise<number> {
    const productoXCompraUpdatePrisma = await this.prisma.productoXCompra.update({
      where: { id: productoXCompra.getIdProductoXCompra() },
      data: {
        productoId: productoXCompra.getIdProducto(),
        compraId: productoXCompra.getIdCompra(),
        cantidad: productoXCompra.getCantidad(),
      },
    });
    return Number(productoXCompraUpdatePrisma.id);
  }

  public async delete(idProductoXCompra: number): Promise<void> {
    await this.prisma.productoXCompra.delete({
      where: { id: idProductoXCompra },
    });
  }
}
