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

        await this.clienteRepository.create(newCliente)
        return newCliente.getIdCliente();
    }
    
    public async update(cliente: UpdateClienteDto): Promise<void> {
        const clienteExistente = await this.clienteRepository.getClientePorMail(cliente.mail);
        if (!clienteExistente) throw CustomError.notFound('No se encontro el cliente');

        clienteExistente.setNombre(cliente.nombre);
        clienteExistente.setApellido(cliente.apellido);
        clienteExistente.setContacto(cliente.contacto);
        clienteExistente.setRazonSocial(cliente.razon_social);
        clienteExistente.setTelefono(cliente.telefono);
        clienteExistente.setMail(cliente.mail);
    }

    public async delete(idCliente: number): Promise<void> {
        const proveedor = await this.clienteRepository.getCliente(idCliente);
        if (!proveedor) throw CustomError.notFound('El cliente no fue encontrado');
        await this.clienteRepository.delete(proveedor.getIdCliente());
    }
}