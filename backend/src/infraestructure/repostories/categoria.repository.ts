// import { PrismaClient } from "@prisma/client";
import { Inject, Injectable } from "../dependencies/injectable.dependency";
import { ICategoriaRepository } from "../../domain/repositories/categoria.interface";
import { Categoria } from "../../domain/entities/categoria.entity";
import { CategoriaPrismaMapper } from "../mappers/categoria-prisma.mapper";
import { PrismaClient } from "../prisma/generated/client";

@Injectable()
export class CategoriaRepository implements ICategoriaRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  public async create(categoria: Categoria): Promise<number> {
    const categoriaData = await this.prisma.categoria.create({
      data: {
        nombre: categoria.getNombre(),
      },
    });
    return Number(categoriaData.id);
  }

  public async getCategoria(idCategoria: number): Promise<Categoria | null> {
    const categoriaPrisma = await this.prisma.categoria.findUnique({
      where: { id: idCategoria },
    });
    if (!categoriaPrisma) return null;
    return CategoriaPrismaMapper.fromPrismaToEntity(categoriaPrisma);
  }

  public async getAll(): Promise<Categoria[]> {
    const categoriasPrisma = await this.prisma.categoria.findMany();
    return CategoriaPrismaMapper.fromPrismaArrayToEntity(categoriasPrisma);
  }

  public async getCategoriaPorNombre(
    nombreCategoria: string
  ): Promise<Categoria | null> {
    const categoriaPrisma = await this.prisma.categoria.findFirst({
      where: { nombre: nombreCategoria },
    });
    if (!categoriaPrisma) return null;
    return CategoriaPrismaMapper.fromPrismaToEntity(categoriaPrisma);
  }

  public async update(categoria: Categoria): Promise<number> {
    const categoriaUpdatePrisma = await this.prisma.categoria.update({
      where: { id: categoria.getIdCategoria() },
      data: {
        nombre: categoria.getNombre(),
      },
    });
    return Number(categoriaUpdatePrisma.id);
  }

  public async delete(idCategoria: number): Promise<void> {
    await this.prisma.categoria.delete({
      where: { id: idCategoria },
    });
  }
}
