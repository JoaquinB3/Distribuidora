import { Router } from "express";
import { facturaController } from "../../infraestructure/dependencies/container.dependency";

export class FacturaRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', facturaController.create);
        router.get('/idFactura/:idFactura', facturaController.getFactura);
        router.get('/', facturaController.getAll);
        router.delete('/delete/:idFactura', facturaController.delete);

        return router;
    }
}