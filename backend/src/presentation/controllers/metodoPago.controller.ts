import { GetMetodoPagoDto } from "../../applicacation/dtos/metodoPago/getMetodoPago.dto";
import { PostMetodoPagoDto } from "../../applicacation/dtos/metodoPago/postMetodoPago.dto";
import { MetodoPagoService } from "../../applicacation/services/metodoPago.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class MetodoPagoController {
    constructor(
        private readonly metodoPagoService: MetodoPagoService
    ) {}

    create = async (req: Request, res: Response) => {
        const newMetodoPago = req.body;
        if (!newMetodoPago) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postMetodoPagoDto] = PostMetodoPagoDto.create(newMetodoPago);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postMetodoPagoDto) {
            try {
                const idMetodoPago = await this.metodoPagoService.create(postMetodoPagoDto);
                res.status(201).json({ idMetodoPago });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getMetodoPago = async (req: Request, res: Response) => {
        const { idMetodoPago } = req.params;
        try {
            const metodoPago = await this.metodoPagoService.getMetodoPago(Number(idMetodoPago));
            if (!metodoPago) {
                res.status(404).json({ message: 'MetodoPago not found' });
                return;
            }
            const categoriaDto = GetMetodoPagoDto.create(metodoPago);
            res.status(200).json(categoriaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const metodoPagos = await this.metodoPagoService.getAll();
            const metodoPagosDto = metodoPagos.map(metodoPago => GetMetodoPagoDto.create(metodoPago));
            res.status(200).json(metodoPagosDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idMetodoPago } = req.params;
        if (!idMetodoPago) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.metodoPagoService.delete(Number(idMetodoPago));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}