import { GetProveedorDto } from "../../applicacation/dtos/proveedor/getProveedor.dto";
import { PostProveedorDto } from "../../applicacation/dtos/proveedor/postProveedor.dto";
import { UpdateProveedorDto } from "../../applicacation/dtos/proveedor/updateProveedor.dto";
import { ProveedorService } from "../../applicacation/services/proveedor.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class ProveedorController {
    constructor(
        private readonly proveedorService: ProveedorService
    ) {}

    create = async (req: Request, res: Response) => {
        const newProveedor = req.body;
        if (!newProveedor) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postProveedorDto] = PostProveedorDto.create(newProveedor);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postProveedorDto) {
            try {
                const idProveedor = await this.proveedorService.create(postProveedorDto);
                res.status(201).json({ idProveedor });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getProveedor = async (req: Request, res: Response) => {
        const { idProveedor } = req.params;
        try {
            const proveedor = await this.proveedorService.getProveedor(Number(idProveedor));
            if (!proveedor) {
                res.status(404).json({ message: 'Proveedor not found' });
                return;
            }
            const proveedorDto = GetProveedorDto.create(proveedor);
            res.status(200).json(proveedorDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const proveedores = await this.proveedorService.getAll();
            const proveedoresDto = proveedores.map(proveedor => GetProveedorDto.create(proveedor));
            res.status(200).json(proveedoresDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    update = async (req: Request, res: Response) => {
        const updatedProveedor = req.body;
        const idProveedor = req.params.idProveedor;
        if (!updatedProveedor) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, updateProveedorDto] = UpdateProveedorDto.create(updatedProveedor, Number(idProveedor));
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (updateProveedorDto) {
            try {
                const idProveedorUpdate = await this.proveedorService.update(updateProveedorDto, Number(idProveedor));
                res.status(201).json({ idProveedorUpdate });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }

    }

    delete = async (req: Request, res: Response) => {
        const { idProveedor } = req.params;
        if (!idProveedor) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.proveedorService.delete(Number(idProveedor));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}