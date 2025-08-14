import { Router } from "express";
import { categoriaController } from "../../infraestructure/dependencies/container.dependency";

export class CategoriaRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', categoriaController.create);
        router.get('/idCategoria/:idCategoria', categoriaController.getCategoria);
        router.get('/', categoriaController.getAll);
        router.patch('/update/:idCategoria', categoriaController.update);
        router.delete('/delete/:idCategoria', categoriaController.delete);

        return router;
    }
}
