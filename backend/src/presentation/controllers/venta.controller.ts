import { GetVentaDto } from "../../applicacation/dtos/venta/getVenta.dto";
import { PostVentaDto } from "../../applicacation/dtos/venta/postVenta.dto";
import { VentaService } from "../../applicacation/services/venta.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class VentaController {
    constructor(
        private readonly ventaService: VentaService
    ) {}

    create = async (req: Request, res: Response) => {
        const newVenta = req.body;
        if (!newVenta) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postVentaDto] = PostVentaDto.create(newVenta);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postVentaDto) {
            try {
                const idVenta = await this.ventaService.create(postVentaDto);
                res.status(201).json({ idVenta });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getVenta = async (req: Request, res: Response) => {
        const { idVenta } = req.params;
        try {
            const venta = await this.ventaService.getVenta(Number(idVenta));
            if (!venta) {
                res.status(404).json({ message: 'Venta not found' });
                return;
            }
            const ventaDto = GetVentaDto.create(venta);
            res.status(200).json(ventaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const ventas = await this.ventaService.getAll();
            const ventasDto = ventas.map(venta => GetVentaDto.create(venta));
            res.status(200).json(ventasDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idVenta } = req.params;
        if (!idVenta) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.ventaService.delete(Number(idVenta));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}