import { Cliente } from "../entities/cliente.entity"

export interface IClienteRepository {
    create(cliente: Cliente): Promise<number>
    getAll(): Promise<Cliente[]>
    getCliente(idCliente: number): Promise<Cliente | null>
    getClientePorMail(mailCliente: string): Promise<Cliente | null>
    update(cliente: Cliente): Promise<void>
    delete(idCliente: number): Promise<void>    
}