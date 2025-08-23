import { GetMarcaDto } from "../../applicacation/dtos/marca/getMarca.dto";
import { PostMarcaDto } from "../../applicacation/dtos/marca/postMarca.dto";
import { UpdateMarcaDto } from "../../applicacation/dtos/marca/updateMarca.dto";
import { MarcaService } from "../../applicacation/services/marca.service";
import { Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class MarcaController {
    constructor(
        private readonly marcaService: MarcaService
    ) {}

    create = async (req: Request, res: Response) => {
        const newMarca = req.body;
        if (!newMarca) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postMarcaDto] = PostMarcaDto.create(newMarca);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postMarcaDto) {
            try {
                const idMarca = await this.marcaService.create(postMarcaDto);
                res.status(201).json({ idMarca });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getMarca = async (req: Request, res: Response) => {
        const { idMarca } = req.params;
        try {
            const marca = await this.marcaService.getMarca(Number(idMarca));
            if (!marca) {
                res.status(404).json({ message: 'Marca not found' });
                return;
            }
            const marcaDto = GetMarcaDto.create(marca);
            res.status(200).json(marcaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const marcas = await this.marcaService.getAll();
            const marcasDto = marcas.map(marca => GetMarcaDto.create(marca));
            res.status(200).json(marcasDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    update = async (req: Request, res: Response) => {
        const updatedMarca = req.body;
        const idMarca = req.params.idMarca;
        if (!updatedMarca) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, updateMarcaDto] = UpdateMarcaDto.create(updatedMarca, Number(idMarca));
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (updateMarcaDto) {
            try {
                const idMarcaUpdate = await this.marcaService.update(updateMarcaDto, Number(idMarca));
                res.status(201).json({ idMarcaUpdate });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }

    }

    delete = async (req: Request, res: Response) => {
        const { idMarca } = req.params;
        if (!idMarca) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.marcaService.delete(Number(idMarca));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}