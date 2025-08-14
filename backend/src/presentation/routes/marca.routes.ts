import { Router } from "express";
import { marcaController } from "../../infraestructure/dependencies/container.dependency";

export class MarcaRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', marcaController.create);
        router.get('/idMarca/:idMarca', marcaController.getMarca);
        router.get('/', marcaController.getAll);
        router.patch('/update/:idMarca', marcaController.update);
        router.delete('/delete/:idMarca', marcaController.delete);

        return router;
    }
}