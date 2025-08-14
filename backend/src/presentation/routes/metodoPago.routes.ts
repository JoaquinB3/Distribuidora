import { Router } from "express";
import { metodoPagoController } from "../../infraestructure/dependencies/container.dependency";

export class MetodoPagoRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', metodoPagoController.create);
        router.get('/idMetodoPago/:idMetodoPago', metodoPagoController.getMetodoPago);
        router.get('/', metodoPagoController.getAll);
        router.delete('/delete/:idMetodoPago', metodoPagoController.delete);

        return router;
    }
}