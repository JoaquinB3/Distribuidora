import { Router } from "express";
import { CategoriaRoutes } from "./routes/categoria.routes";
import { MarcaRoutes } from "./routes/marca.routes";
import { MetodoPagoRoutes } from "./routes/metodoPago.routes";
import { ClienteRoutes } from "./routes/cliente.routes";
import { ProveedorRoutes } from "./routes/proveedor.routes";
import { CompraRoutes } from "./routes/compra.routes";
import { VentaRoutes } from "./routes/venta.routes";
import { FacturaRoutes } from "./routes/factura.routes";
import { ProductoRoutes } from "./routes/producto.routes";
import { ProductoXCompraRoutes } from "./routes/productoXCompra.routes";
import { ProductoXVentaRoutes } from "./routes/productoXVenta.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/categoria', CategoriaRoutes.routes);
        router.use('/marca', MarcaRoutes.routes);
        router.use('/metodoPago', MetodoPagoRoutes.routes);
        router.use('/cliente', ClienteRoutes.routes);
        router.use('/proveedor', ProveedorRoutes.routes);
        router.use('/compra', CompraRoutes.routes);
        router.use('/venta', VentaRoutes.routes);
        router.use('/factura', FacturaRoutes.routes);
        router.use('/producto', ProductoRoutes.routes);
        router.use('/productoXCompra', ProductoXCompraRoutes.routes);
        router.use('/productoXVenta', ProductoXVentaRoutes.routes);

        return router;
    }
}