import 'reflect-metadata';
import { container } from 'tsyringe';
import { REPOSITORIES_TOKENS } from './repositories-tokens.dependency';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '../prisma/generated/client';

// Repositorios
import { CategoriaRepository } from '../repostories/categoria.repository';
import { MarcaRepository } from '../repostories/marca.repository';
import { ClienteRepository } from '../repostories/cliente.repository';
import { ProveedorRepository } from '../repostories/proveedor.repository';
import { MetodoPagoRepository } from '../repostories/metodoPago.repository';
import { CompraRepository } from '../repostories/compra.repository';
import { VentaRepository } from '../repostories/venta.repository';
import { facturaRepository } from '../repostories/factura.repository';
import { ProductoRepository } from '../repostories/producto.repository';
import { ProductoXCompraRepository } from '../repostories/productoXCompra.repository';
import { ProductoXVentaRepository } from '../repostories/productoXVenta.repository';

// Servicios
import { CategoriaService } from '../../applicacation/services/categoria.service';

// Controladores
import { CategoriaController } from '../../presentation/controllers/categoria.controller';
import { MarcaController } from '../../presentation/controllers/marca.controller';
import { MetodoPagoController } from '../../presentation/controllers/metodoPago.controller';
import { ClienteController } from '../../presentation/controllers/cliente.controller';
import { ProveedorController } from '../../presentation/controllers/proveedor.controller';
import { VentaController } from '../../presentation/controllers/venta.controller';
import { FacturaController } from '../../presentation/controllers/factura.controller';
import { ProductoController } from '../../presentation/controllers/producto.controller';
import { ProductoXCompraController } from '../../presentation/controllers/productoXCompra.controller';
import { ProductoXVentaController } from '../../presentation/controllers/prductoXVenta.controller';
import { CompraController } from '../../presentation/controllers/compras.controller';

// Instancia de Prisma
const prisma = new PrismaClient();
container.register(PrismaClient, { useValue: prisma });

// Repositorios
container.register(REPOSITORIES_TOKENS.ICategoriaRepository, { useClass: CategoriaRepository });
container.register(REPOSITORIES_TOKENS.IMarcaRepository, { useClass: MarcaRepository });
container.register(REPOSITORIES_TOKENS.IClienteRepository, { useClass: ClienteRepository });
container.register(REPOSITORIES_TOKENS.IProveedorRepository, { useClass: ProveedorRepository });
container.register(REPOSITORIES_TOKENS.IMetodoPagoRepository, { useClass: MetodoPagoRepository });
container.register(REPOSITORIES_TOKENS.ICompraRepository, { useClass: CompraRepository });
container.register(REPOSITORIES_TOKENS.IVentaRepository, { useClass: VentaRepository });
container.register(REPOSITORIES_TOKENS.IFacturaRepository, { useClass: facturaRepository });
container.register(REPOSITORIES_TOKENS.IProductoRepository, { useClass: ProductoRepository });
container.register(REPOSITORIES_TOKENS.IProductoXCompraRepository, { useClass: ProductoXCompraRepository });
container.register(REPOSITORIES_TOKENS.IProductoXVentaRepository, { useClass: ProductoXVentaRepository });

// Servicios
container.register(CategoriaService, { useClass: CategoriaService });
container.register(MarcaRepository, { useClass: MarcaRepository});
container.register(ClienteRepository, { useClass: ClienteRepository });
container.register(ProveedorRepository, { useClass: ProveedorRepository});
container.register(MetodoPagoRepository, { useClass: MetodoPagoRepository });
container.register(CompraRepository, { useClass: CompraRepository });
container.register(VentaRepository, { useClass: VentaRepository });
container.register(facturaRepository, { useClass: facturaRepository });
container.register(ProductoRepository, { useClass: ProductoRepository });
container.register(ProductoXCompraRepository, { useClass: ProductoXCompraRepository });
container.register(ProductoXVentaRepository, { useClass: ProductoXVentaRepository });

// Controladores
container.register("CategoriaController", { useClass: CategoriaController });
export const categoriaController = container.resolve(CategoriaController);

container.register("MarcaController", { useClass: MarcaController });
export const marcaController = container.resolve(MarcaController);

container.register("MetodoPagoController", { useClass: MetodoPagoController });
export const metodoPagoController = container.resolve(MetodoPagoController);

container.register("ClienteController", { useClass: ClienteController });
export const clienteController = container.resolve(ClienteController);

container.register("ProveedorController", { useClass: ProveedorController });
export const proveedorController = container.resolve(ProveedorController);

container.register("CompraController", { useClass: CompraController });
export const compraController = container.resolve(CompraController);

container.register("VentaController", { useClass: VentaController });
export const ventaController = container.resolve(VentaController);

container.register("FacturaController", { useClass: FacturaController });
export const facturaController = container.resolve(FacturaController);

container.register("ProductoController", { useClass: ProductoController });
export const productoController = container.resolve(ProductoController);

container.register("ProductoXCompraController", { useClass: ProductoXCompraController });
export const productoXCompraController = container.resolve(ProductoXCompraController);

container.register("ProductoXVentaController", { useClass: ProductoXVentaController });
export const productoXVentaController = container.resolve(ProductoXVentaController);
