import { Proveedor } from "../../../domain/entities/proveedor.entity";

export class GetProveedorDto {
    private constructor (
        public idProveedor: number,
        public nombre: string,
        public apellido: string,
        public contacto: string,
        public razon_social: string,
        public telefono: number,
        public mail: string,
    ) {} 

    public static create(proveedor: Proveedor): GetProveedorDto {
        return new GetProveedorDto(
            proveedor.getIdProveedor(),
            proveedor.getNombre(),
            proveedor.getApellido(),
            proveedor.getContacto(),
            proveedor.getRazonSocial(),
            proveedor.getTelefono(),
            proveedor.getMail(),
        );
    }
}