import { GetProductoXCompraDto } from "../../applicacation/dtos/productoXCompra/getProductoXCompra.dto";
import { PostProductoXCompraDto } from "../../applicacation/dtos/productoXCompra/postProductoXCompra.dto";
import { ProductoXCompraService } from "../../applicacation/services/productoXCompra.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class ProductoXCompraController {
    constructor(
        private readonly productoXCompraService: ProductoXCompraService
    ) {}

    create = async (req: Request, res: Response) => {
        const newProductoXCompra = req.body;
        if (!newProductoXCompra) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postProductoXCompraDto] = PostProductoXCompraDto.create(newProductoXCompra);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postProductoXCompraDto) {
            try {
                const idProductoXCompra = await this.productoXCompraService.create(postProductoXCompraDto);
                res.status(201).json({ idProductoXCompra });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getProductoXCompra = async (req: Request, res: Response) => {
        const { idProductoXCompra } = req.params;
        try {
            const productoXCompra = await this.productoXCompraService.getProductoXCompra(Number(idProductoXCompra));
            if (!productoXCompra) {
                res.status(404).json({ message: 'ProductoXCompra not found' });
                return;
            }
            const productoXCompraDto = GetProductoXCompraDto.create(productoXCompra);
            res.status(200).json(productoXCompraDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const productosXCompra = await this.productoXCompraService.getAll();
            const productosXCompraDto = productosXCompra.map(productoXCompra => GetProductoXCompraDto.create(productoXCompra));
            res.status(200).json(productosXCompraDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    delete = async (req: Request, res: Response) => {
        const { idProductoXCompra } = req.params;
        if (!idProductoXCompra) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.productoXCompraService.delete(Number(idProductoXCompra));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}