import { GetProductoXVentaDto } from "../../applicacation/dtos/productoXVenta/getProductoXVenta.dto";
import { PostProductoXVentaDto } from "../../applicacation/dtos/productoXVenta/postProductoXVenta.dto";
import { ProductoXVentaService } from "../../applicacation/services/productoXVenta.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class ProductoXVentaController {
    constructor(
        private readonly productoXVentaService: ProductoXVentaService
    ) {}

    create = async (req: Request, res: Response) => {
        const newProductoXVenta = req.body;
        if (!newProductoXVenta) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postProductoXVentaDto] = PostProductoXVentaDto.create(newProductoXVenta);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postProductoXVentaDto) {
            try {
                const idProductoXVenta = await this.productoXVentaService.create(postProductoXVentaDto);
                res.status(201).json({ idProductoXVenta });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getProductoXVenta = async (req: Request, res: Response) => {
        const { idProductoXVenta } = req.params;
        try {
            const productoXVenta = await this.productoXVentaService.getProductoXVenta(Number(idProductoXVenta));
            if (!productoXVenta) {
                res.status(404).json({ message: 'ProductoXVenta not found' });
                return;
            }
            const productoXVentaDto = GetProductoXVentaDto.create(productoXVenta);
            res.status(200).json(productoXVentaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const productosXVenta = await this.productoXVentaService.getAll();
            const productosXVentaDto = productosXVenta.map(productoXVenta => GetProductoXVentaDto.create(productoXVenta));
            res.status(200).json(productosXVentaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idProductoXVenta } = req.params;
        if (!idProductoXVenta) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.productoXVentaService.delete(Number(idProductoXVenta));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}