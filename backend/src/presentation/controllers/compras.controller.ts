import { GetCompraDto } from "../../applicacation/dtos/compra/getCompra.dto";
import { PostCompraDto } from "../../applicacation/dtos/compra/postCompra.dto";
import { CompraService } from "../../applicacation/services/compra.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class CompraController {
    constructor(
        private readonly compraService: CompraService
    ) {}

    create = async (req: Request, res: Response) => {
        const newCompra = req.body;
        if (!newCompra) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postCompraDto] = PostCompraDto.create(newCompra);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postCompraDto) {
            try {
                const idCompra = await this.compraService.create(postCompraDto);
                res.status(201).json({ idCompra });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getCompra = async (req: Request, res: Response) => {
        const { idCompra } = req.params;
        try {
            const compra = await this.compraService.getCompra(Number(idCompra));
            if (!compra) {
                res.status(404).json({ message: 'Compra not found' });
                return;
            }
            const compraDto = GetCompraDto.create(compra);
            res.status(200).json(compraDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const compras = await this.compraService.getAll();
            const comprasDto = compras.map(compra => GetCompraDto.create(compra));
            res.status(200).json(comprasDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idCompra } = req.params;
        if (!idCompra) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.compraService.delete(Number(idCompra));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}