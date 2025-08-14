import { Router } from "express";
import { compraController } from "../../infraestructure/dependencies/container.dependency";


export class CompraRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', compraController.create);
        router.get('/idCompra/:idCompra', compraController.getCompra);
        router.get('/', compraController.getAll);
        router.delete('/delete/:idCompra', compraController.delete);

        return router;
    }
}