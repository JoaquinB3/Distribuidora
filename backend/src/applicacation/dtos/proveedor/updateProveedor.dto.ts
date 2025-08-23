import { putProveedorValidation } from "../../validations/proveedor/postProveedor.validation";

export class UpdateProveedorDto {
    private constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public contacto?: string,
        public razon_social?: string,
        public telefono?: string,
        public mail?: string,
    ) {}

    public static create(proveedor: any, id: number): [string?, UpdateProveedorDto?] {
        const proveedorValidation = putProveedorValidation(proveedor);

        if (!proveedorValidation.success) {
            return [JSON.stringify(proveedorValidation.error.message)];
        }

        const data = proveedorValidation.data;

        return [
            undefined,
            new UpdateProveedorDto(
                id,
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