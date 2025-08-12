import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IProductoRepository } from "../../domain/repositories/producto.interface";
import { Producto } from "../../domain/entities/producto.entity";
import { ProductoPrismaMapper } from "../mappers/producto-prisma.mapper";

@Injectable()
export class ProductoRepository implements IProductoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(producto: Producto): Promise<number> {
    const productoData = await this.prisma.producto.create({
      data: {
        codigo: producto.getCodigo(),
        nombre: producto.getNombre(),
        descripcion: producto.getDescripcion(),
        precio: producto.getPrecio(),
        stock: producto.getStock(),
        categoriaId: producto.getIdCategoria(),
        marcaId: producto.getIdMarca(),
      },
    });
    return Number(productoData.idProducto);
  }

  public async getProducto(idProducto: number): Promise<Producto | null> {
    const productoPrisma = await this.prisma.producto.findUnique({
      where: { id: idProducto },
    });
    if (!productoPrisma) return null;
    return ProductoPrismaMapper.fromPrismaToEntity(productoPrisma);
  }

  public async getAll(): Promise<Producto[]> {
    const productosPrisma = this.prisma.producto.findMany();
    return ProductoPrismaMapper.fromPrismaArrayToEntity(productosPrisma);
  }

  public async getProductoXCodigo(
    codigoProducto: number
  ): Promise<Producto | null> {
    const productoPrisma = this.prisma.producto.findUnique({
      where: { codigo: codigoProducto },
    });
    if (!productoPrisma) return null;
    return ProductoPrismaMapper.fromPrismaToEntity(productoPrisma);
  }

  public async update(producto: Producto): Promise<number> {
    const productoUpdatePrisma = await this.prisma.producto.update({
      where: { id: producto.getIdProducto() },
      data: {
        codigo: producto.getCodigo(),
        nombre: producto.getNombre(),
        descripcion: producto.getDescripcion(),
        precio: producto.getPrecio(),
        stock: producto.getStock(),
        categoriaId: producto.getIdCategoria(),
        marcaId: producto.getIdMarca(),
      },
    });
    return Number(productoUpdatePrisma.idProducto);
  }

  public async delete(idProducto: number): Promise<void> {
    await this.prisma.producto.delete({
      where: { id: idProducto },
    });
  }
}