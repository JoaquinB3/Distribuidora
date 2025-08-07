import { postProveedorValidation } from "../../validations/proveedor/postProveedor.validation";

export class PostProveedorDto {
    private constructor(
        public nombre: string,
        public apellido: string,
        public contacto: string,
        public razon_social: string,
        public telefono: string,
        public mail: string,
    ) {}

    public static create(proveedor: any): [string?, PostProveedorDto?] {
        const proveedorValidation = postProveedorValidation(proveedor);

        if (!proveedorValidation.success) {
            return [JSON.stringify(proveedorValidation.error.message)];
        }

        const data = proveedorValidation.data;

        return [
            undefined,
            new PostProveedorDto(
                data.nombre,
                data.apellido,
                data.contacto,
                data.razon_social,
                data.telefono,
                data.mail,
            )
        ];
    }
}