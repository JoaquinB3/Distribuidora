import { Router } from "express";
import { productoController } from "../../infraestructure/dependencies/container.dependency";

export class ProductoRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', productoController.create);
        router.get('/idProducto/:idProducto', productoController.getProducto);
        router.get('/', productoController.getAll);
        router.patch('/update/:idProducto', productoController.update);
        router.delete('/delete/:idProducto', productoController.delete);

        return router;
    }
}