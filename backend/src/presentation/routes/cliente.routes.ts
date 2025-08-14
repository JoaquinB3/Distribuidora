import { Router } from "express";
import { clienteController } from "../../infraestructure/dependencies/container.dependency";

export class ClienteRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', clienteController.create);
        router.get('/idCliente/:idCliente', clienteController.getCliente);
        router.get('/', clienteController.getAll);
        router.patch('/update/:idCliente', clienteController.update);
        router.delete('/delete/:idCliente', clienteController.delete);

        return router;
    }
}