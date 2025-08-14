import { Router } from "express";
import { clienteController, proveedorController } from "../../infraestructure/dependencies/container.dependency";

export class ProveedorRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', proveedorController.create);
        router.get('/idProveedor/:idProveedor', proveedorController.getProveedor);
        router.get('/', proveedorController.getAll);
        router.patch('/update/:idProveedor', proveedorController.update);
        router.delete('/delete/:idProveedor', proveedorController.delete);

        return router;
    }
}