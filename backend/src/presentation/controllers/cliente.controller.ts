import { GetClienteDto } from "../../applicacation/dtos/cliente/getCliente.dto";
import { PostClienteDto } from "../../applicacation/dtos/cliente/postCliente.dto";
import { UpdateClienteDto } from "../../applicacation/dtos/cliente/updateCliente.dto";
import { ClienteService } from "../../applicacation/services/cliente.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class ClienteController {
    constructor(
        private readonly clienteService: ClienteService
    ) {}

    create = async (req: Request, res: Response) => {
        const newCliente = req.body;
        if (!newCliente) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postClienteDto] = PostClienteDto.create(newCliente);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postClienteDto) {
            try {
                const idCliente = await this.clienteService.create(postClienteDto);
                res.status(201).json({ idCliente });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getCliente = async (req: Request, res: Response) => {
        const { idCliente } = req.params;
        try {
            const cliente = await this.clienteService.getCliente(Number(idCliente));
            if (!cliente) {
                res.status(404).json({ message: 'Cliente not found' });
                return;
            }
            const clienteDto = GetClienteDto.create(cliente);
            res.status(200).json(clienteDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const clientes = await this.clienteService.getAll();
            const clientesDto = clientes.map(cliente => GetClienteDto.create(cliente));
            res.status(200).json(clientesDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    update = async (req: Request, res: Response) => {
        const updatedCliente = req.body;
        if (!updatedCliente) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, updateClienteDto] = UpdateClienteDto.create(updatedCliente);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (updateClienteDto) {
            try {
                const idCliente = await this.clienteService.update(updateClienteDto);
                res.status(201).json({ idCliente });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }

    }

    delete = async (req: Request, res: Response) => {
        const { idCliente } = req.params;
        if (!idCliente) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.clienteService.delete(Number(idCliente));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}