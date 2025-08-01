import { Factura } from "../../domain/entities/factura.entity";
import { IFacturaRepository } from "../../domain/repositories/factura.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostFacturaDto } from "../dtos/factura/postFactura.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class MarcaService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.IFacturaRepository) private readonly facturaRepository: IFacturaRepository
    ) {}

    public async getFactura(idFactura: number): Promise<Factura | null> {
        const factura = await this.facturaRepository.getFactura(idFactura);

        if(!factura) throw CustomError.notFound('No se encontro una factura con ese id');
        return factura;
    }

    public async getAll(): Promise<Factura[]> {
        const facturas = await this.facturaRepository.getAll();
        if (facturas.length === 0) throw CustomError.notFound('No se encontraron facturas');
        return facturas;
    }

    public async create(factura: PostFacturaDto): Promise<number> {
        const newFactura = new Factura(
            0,
            factura.fecha,
            factura.precioFinal,
        );

        await this.facturaRepository.create(newFactura)
        return newFactura.getIdFactura();
    }
    
    public async delete(idFactura: number): Promise<void> {
        const factura = await this.facturaRepository.getFactura(idFactura);
        if (!factura) throw CustomError.notFound('La factura no fue encontrada');
        await this.facturaRepository.delete(factura.getIdFactura());
    }  
}