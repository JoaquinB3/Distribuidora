import { Router } from "express";
import { productoXCompraController, productoXVentaController } from "../../infraestructure/dependencies/container.dependency";

export class ProductoXVentaRoutes {
    static get routes(): Router {
        const router = Router();

        router.post('/create', productoXVentaController.create);
        router.get('/idProductoXVenta/:idProductoXVenta', productoXVentaController.getProductoXVenta);
        router.get('/', productoXVentaController.getAll);
        router.delete('/delete/:idProductoXVenta', productoXVentaController.delete);

        return router;
    }
}