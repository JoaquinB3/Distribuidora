import { PrismaClient } from "@prisma/client";
import { Injectable } from "../dependencies/injectable.dependency";
import { IMarcaRepository } from "../../domain/repositories/marca.interface";
import { Marca } from "../../domain/entities/marca.entity";
import { MarcaPrismaMapper } from "../mappers/marca-prisma.mapper";

@Injectable()
export class MarcaRepository implements IMarcaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async create(marca: Marca): Promise<number> {
    const marcaData = await this.prisma.marca.create({
      data: {
        nombre: marca.getNombre(),
      },
    });
    return Number(marcaData.id);
  }

  public async getMarca(idMarca: number): Promise<Marca | null> {
    const marcaPrisma = await this.prisma.marca.findUnique({
      where: { id: idMarca },
    });
    if (!marcaPrisma) return null;
    return MarcaPrismaMapper.fromPrismaToEntity(marcaPrisma);
  }

  public async getAll(): Promise<Marca[]> {
    const marcasPrisma = this.prisma.marca.findMany();
    return MarcaPrismaMapper.fromPrismaArrayToEntity(marcasPrisma);
  }

  public async getMarcaPorNombre(
    nombreMarca: string
  ): Promise<Marca | null> {
    const marcaPrisma = this.prisma.marca.findUnique({
      where: { nombre: nombreMarca },
    });
    if (!marcaPrisma) return null;
    return MarcaPrismaMapper.fromPrismaToEntity(marcaPrisma);
  }

  public async update(marca: Marca): Promise<number> {
    const marcaUpdatePrisma = await this.prisma.marca.update({
      where: { id: marca.getIdMarca() },
      data: {
        nombre: marca.getNombre(),
      },
    });
    return Number(marcaUpdatePrisma.id);
  }

  public async delete(idMarca: number): Promise<void> {
    await this.prisma.marca.delete({
      where: { id: idMarca },
    });
  }
}
