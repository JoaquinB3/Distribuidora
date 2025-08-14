import { GetFacturaDto } from "../../applicacation/dtos/factura/getFactura.dto";
import { PostFacturaDto } from "../../applicacation/dtos/factura/postFactura.dto";
import { FacturaService } from "../../applicacation/services/factura.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class FacturaController {
    constructor(
        private readonly facturaService: FacturaService
    ) {}

    create = async (req: Request, res: Response) => {
        const newFactura = req.body;
        if (!newFactura) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postFacturaDto] = PostFacturaDto.create(newFactura);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postFacturaDto) {
            try {
                const idFactura = await this.facturaService.create(postFacturaDto);
                res.status(201).json({ idFactura });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getFactura = async (req: Request, res: Response) => {
        const { idFactura } = req.params;
        try {
            const factura = await this.facturaService.getFactura(Number(idFactura));
            if (!factura) {
                res.status(404).json({ message: 'Factura not found' });
                return;
            }
            const facturaDto = GetFacturaDto.create(factura);
            res.status(200).json(facturaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const facturas = await this.facturaService.getAll();
            const facturasDto = facturas.map(factura => GetFacturaDto.create(factura));
            res.status(200).json(facturasDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idFactura } = req.params;
        if (!idFactura) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.facturaService.delete(Number(idFactura));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}