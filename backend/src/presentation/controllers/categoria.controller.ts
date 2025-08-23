import { GetCategoriaDto } from "../../applicacation/dtos/categoria/getCategortia.dto";
import { PostCategoriaDto } from "../../applicacation/dtos/categoria/postCategoria.dto";
import { UpdateCategoriaDto } from "../../applicacation/dtos/categoria/updateCategoria.dto";
import { CategoriaService } from "../../applicacation/services/categoria.service";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { HandleError } from "../errors/handle.error";
import { type Request, type Response } from 'express';

@Injectable()
export class CategoriaController {
    constructor(
        private readonly categoriaService: CategoriaService
    ) {}

    create = async (req: Request, res: Response) => {
        const newCategoria = req.body;
        if (!newCategoria) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, postCategoriaDto] = PostCategoriaDto.create(newCategoria);
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (postCategoriaDto) {
            try {
                const idCategoria = await this.categoriaService.create(postCategoriaDto);
                res.status(201).json({ idCategoria });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }
    }
    
    getCategoria = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        try {
            const categoria = await this.categoriaService.getCategoria(Number(idCategoria));
            if (!categoria) {
                res.status(404).json({ message: 'Categoria not found' });
                return;
            }
            const categoriaDto = GetCategoriaDto.create(categoria);
            res.status(200).json(categoriaDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }
    
    getAll = async (req: Request, res: Response) => {
        try {
            const categorias = await this.categoriaService.getAll();
            const categoriasDto = categorias.map(categoria => GetCategoriaDto.create(categoria));
            res.status(200).json(categoriasDto);
        } catch (error) {
            HandleError.throw(error, res);
        }
    }

    update = async (req: Request, res: Response) => {
        const updatedCategoria = req.body;
        const idCategoria = req.params.idCategoria;
        
        if (!updatedCategoria) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        const [error, updateCategoriaDto] = UpdateCategoriaDto.create(updatedCategoria, Number(idCategoria));
        if (error) {
            res.status(400).json({ message: error });
            return;
        }
        
        if (updateCategoriaDto) {
            try {
                const idCategoriaUpdate = await this.categoriaService.update(updateCategoriaDto, Number(idCategoria));
                res.status(201).json({ idCategoriaUpdate });
            } catch (error) {
                HandleError.throw(error, res);
            }
        }

    }

    delete = async (req: Request, res: Response) => {
        const { idCategoria } = req.params;
        if (!idCategoria) {
            res.status(400).json({ message: 'Request body is empty' });
            return;
        }

        try {
            await this.categoriaService.delete(Number(idCategoria));
            res.status(204).send();
        } catch (error) {
            HandleError.throw(error, res);
        }
    }  
}