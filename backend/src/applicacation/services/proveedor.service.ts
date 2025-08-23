import { Proveedor } from "../../domain/entities/proveedor.entity";
import { IProveedorRepository } from "../../domain/repositories/proveedor.interface";
import { Inject, Injectable } from "../../infraestructure/dependencies/injectable.dependency";
import { REPOSITORIES_TOKENS } from "../../infraestructure/dependencies/repositories-tokens.dependency";
import { PostProveedorDto } from "../dtos/proveedor/postProveedor.dto";
import { UpdateProveedorDto } from "../dtos/proveedor/updateProveedor.dto";
import { CustomError } from "../errors/custom.errors";

@Injectable()
export class ProveedorService {
    constructor(
        @Inject(REPOSITORIES_TOKENS.IProveedorRepository) private readonly proveedorRepository: IProveedorRepository
    ) {}

    public async getProveedor(idProveedor: number): Promise<Proveedor | null> {
            const proveedor = await this.proveedorRepository.getProveedor(idProveedor);
    
            if(!proveedor) throw CustomError.notFound('No se encontro un proveedor con ese id');
            return proveedor;
        }
    
    public async getAll(): Promise<Proveedor[]> {
        const proveedores = await this.proveedorRepository.getAll();
        if (proveedores.length === 0) throw CustomError.notFound('No se encontraron proveedores');
        return proveedores;
    }

    public async create(proveedor: PostProveedorDto): Promise<number> {
        const newProveedor = new Proveedor(
            0,
            proveedor.nombre,
            proveedor.apellido,
            proveedor.contacto,
            proveedor.razon_social,
            proveedor.telefono,
            proveedor.mail,
        );

        const newBdProveedorId = await this.proveedorRepository.create(newProveedor)
        return newBdProveedorId;
    }
    
    public async update(proveedor: UpdateProveedorDto, idProveedor: number): Promise<number> {
        const proveedorExistente = await this.proveedorRepository.getProveedor(idProveedor);
        if (!proveedorExistente) throw CustomError.notFound('No se encontro el proveedor');

        proveedorExistente.setNombre(proveedor.nombre || proveedorExistente.getNombre());
        proveedorExistente.setApellido(proveedor.apellido || proveedorExistente.getApellido());
        proveedorExistente.setContacto(proveedor.contacto || proveedorExistente.getContacto());
        proveedorExistente.setRazonSocial(proveedor.razon_social || proveedorExistente.getRazonSocial());
        proveedorExistente.setTelefono(proveedor.telefono || proveedorExistente.getTelefono());
        proveedorExistente.setMail(proveedor.mail || proveedorExistente.getMail());

        const updatedProveedorId = await this.proveedorRepository.update(proveedorExistente);
        return updatedProveedorId;
    }

    public async delete(idProveedor: number): Promise<void> {
        const proveedor = await this.proveedorRepository.getProveedor(idProveedor);
        if (!proveedor) throw CustomError.notFound('El proveedor no fue encontrada');
        await this.proveedorRepository.delete(proveedor.getIdProveedor());
    }
}