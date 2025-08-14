import { Router } from "express";
import { productoXCompraController } from "../../infraestructure/dependencies/container.dependency";

export class ProductoXCompraRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', productoXCompraController.create);
        router.get('/idProductoXCompra/:idProductoXCompra', productoXCompraController.getProductoXCompra);
        router.get('/', productoXCompraController.getAll);
        router.delete('/delete/:idProductoXCompra', productoXCompraController.delete);

        return router;
    }
}