import 'reflect-metadata'
import { container } from 'tsyringe'
import { REPOSITORIES_TOKENS } from './repositories-tokens.dependency'
import { prismaClient } from '../prisma/prismaClient';
import { PrismaClient } from '@prisma/client';
import { CategoriaRepository } from '../repostories/categoria.repository';
import { CategoriaService } from '../../applicacation/services/categoria.service';
import { MarcaRepository } from '../repostories/marca.repository';
import { ClienteRepository } from '../repostories/cliente.repository';
import { ProveedorRepository } from '../repostories/proveedor.repository';
import { MetodoPagoRepository } from '../repostories/metodoPago.repository';
import { CompraRepository } from '../repostories/compra.repository';

container.register(PrismaClient, { useValue: PrismaClient });
//Repositorios
container.register(REPOSITORIES_TOKENS.ICategoriaRepository, { useClass: CategoriaRepository});
container.register(REPOSITORIES_TOKENS.IMarcaRepository, { useClass: MarcaRepository });
container.register(REPOSITORIES_TOKENS.IClienteRepository, { useClass: ClienteRepository });
container.register(REPOSITORIES_TOKENS.IProveedorRepository, { useClass: ProveedorRepository });
container.register(REPOSITORIES_TOKENS.IMetodoPagoRepository, { useClass: MetodoPagoRepository });
container.register(REPOSITORIES_TOKENS.ICompraRepository, { useClass: CompraRepository });

//Servicios
container.register(CategoriaService, { useClass: CategoriaService});
container.register(MarcaRepository, { useClass: MarcaRepository});
container.register(ClienteRepository, { useClass: ClienteRepository });
container.register(ProveedorRepository, { useClass: ProveedorRepository});
container.register(MetodoPagoRepository, { useClass: MetodoPagoRepository });
container.register(CompraRepository, { useClass: CompraRepository });

//Controladores

