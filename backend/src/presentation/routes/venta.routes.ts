import { Router } from "express";
import { ventaController } from "../../infraestructure/dependencies/container.dependency";

export class VentaRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', ventaController.create);
        router.get('/idVenta/:idVenta', ventaController.getVenta);
        router.get('/', ventaController.getAll);
        router.delete('/delete/:idVenta', ventaController.delete);

        return router;
    }
}