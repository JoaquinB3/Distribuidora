import { MetodoPago } from "../../domain/entities/metodoPago.entity";
import { IMetodoPagoRepository } from "../../domain/repositories/metodoPago.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostMetodoPagoDto } from "../dtos/metodoPago/postMetodoPago.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class MetodoPagoService {
    constructor (
        @Inject(REPOSITORIES_TOKENS.IMetodoPagoRepository) private readonly metodoPagoRepository: IMetodoPagoRepository
    ) {}
    
    public async getMetodoPago(idMetodoPago: number): Promise<MetodoPago | null> {
        const metodoPago = await  this.metodoPagoRepository.getMetodoPago(idMetodoPago);

        if (!metodoPago) throw CustomError.notFound('No se encontro una metodo de pago con ese id');
        return metodoPago;
    }
    
    public async getAll(): Promise<MetodoPago[]> {
        const metodoPagos = await this.metodoPagoRepository.getAll();
        if (metodoPagos.length === 0) throw CustomError.notFound('No se encontraron metodos de pagos');
        return metodoPagos;
    }
    
    public async create(metodoPago: PostMetodoPagoDto): Promise<number> {
        const newMetodoPago = new MetodoPago(
            0,
            metodoPago.nombre,
        );

        await this.metodoPagoRepository.create(newMetodoPago)
        return newMetodoPago.getIdMetodoPago();
    }

    public async delete(idMetodoPago: number): Promise<void> {
        const metodoPago = await this.metodoPagoRepository.getMetodoPago(idMetodoPago);
        if (!metodoPago) throw CustomError.notFound('El metodo de pago no fue encontrada');
        await this.metodoPagoRepository.delete(metodoPago.getIdMetodoPago());
    } 
}