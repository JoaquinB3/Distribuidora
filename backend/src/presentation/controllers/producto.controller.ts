import { GetProductoDto } from "../../applicacation/dtos/producto/getProducto.dto";
import { PostProductoDto } from "../../applicacation/dtos/producto/postProducto.dto";
import { UpdateProductoDto } from "../../applicacation/dtos/producto/updateProducto.dto";
import { ProductoService } from "../../applicacation/services/producto.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class ProductoController {
    constructor(
        private readonly productoService: ProductoService
    ) {}

    create = async (req: Request, res: Response) => {
        const newProducto = req.body;
        if (!newProducto) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postProductoDto] = PostProductoDto.create(newProducto);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postProductoDto) {
            try {
                const idProducto = await this.productoService.create(postProductoDto);
                res.status(201).json({ idProducto });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getProducto = async (req: Request, res: Response) => {
        const { idProducto } = req.params;
        try {
            const producto = await this.productoService.getProducto(Number(idProducto));
            if (!producto) {
                res.status(404).json({ message: 'Producto not found' });
                return;
            }
            const productoDto = GetProductoDto.create(producto);
            res.status(200).json(productoDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const productos = await this.productoService.getAll();
            const productosDto = productos.map(producto => GetProductoDto.create(producto));
            res.status(200).json(productosDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    update = async (req: Request, res: Response) => {
        const updatedProducto = req.body;
        if (!updatedProducto) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, updateProductoDto] = UpdateProductoDto.create(updatedProducto);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (updateProductoDto) {
            try {
                const idProducto = await this.productoService.update(updateProductoDto);
                res.status(201).json({ idProducto });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }

    }

    delete = async (req: Request, res: Response) => {
        const { idProducto } = req.params;
        if (!idProducto) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.productoService.delete(Number(idProducto));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}