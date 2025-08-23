import { Cliente } from "../../domain/entities/cliente.entity";
import { IClienteRepository } from "../../domain/repositories/cliente.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostClienteDto } from "../dtos/cliente/postCliente.dto";
import { UpdateClienteDto } from "../dtos/cliente/updateCliente.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ClienteService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.IClienteRepository) private readonly clienteRepository: IClienteRepository
    ) {}

    public async getCliente(idCliente: number): Promise<Cliente | null> {
            const cliente = await this.clienteRepository.getCliente(idCliente);
    
            if(!cliente) throw CustomError.notFound('No se encontro un cliente con ese id');
            return cliente;
        }
    
    public async getAll(): Promise<Cliente[]> {
        const clientes = await this.clienteRepository.getAll();
        if (clientes.length === 0) throw CustomError.notFound('No se encontraron clientes');
        return clientes;
    }

    public async create(cliente: PostClienteDto): Promise<number> {
        const newCliente = new Cliente(
            0,
            cliente.nombre,
            cliente.apellido,
            cliente.contacto,
            cliente.razon_social,
            cliente.telefono,
            cliente.mail,
        );

        const newBdClienteId = await this.clienteRepository.create(newCliente)
        return newBdClienteId;
    }
    
    public async update(cliente: UpdateClienteDto, idCliente: number): Promise<number> {
        const clienteExistente = await this.clienteRepository.getCliente(idCliente);
        if (!clienteExistente) throw CustomError.notFound('No se encontro el cliente');

        clienteExistente.setNombre(cliente.nombre || clienteExistente.getNombre());
        clienteExistente.setApellido(cliente.apellido || clienteExistente.getApellido());
        clienteExistente.setContacto(cliente.contacto || clienteExistente.getContacto());
        clienteExistente.setRazonSocial(cliente.razon_social || clienteExistente.getRazonSocial());
        clienteExistente.setTelefono(cliente.telefono || clienteExistente.getTelefono());
        clienteExistente.setMail(cliente.mail || clienteExistente.getMail());

        const updatedClienteId = await this.clienteRepository.update(clienteExistente);
        return updatedClienteId;
    }

    public async delete(idCliente: number): Promise<void> {
        const cliente = await this.clienteRepository.getCliente(idCliente);
        if (!cliente) throw CustomError.notFound('El cliente no fue encontrado');
        await this.clienteRepository.delete(cliente.getIdCliente());
    }
}