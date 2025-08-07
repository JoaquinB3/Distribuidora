import { postClienteValidation } from "../../validations/cliente/postCliente.validation";

export class PostClienteDto {
    private constructor(
        public nombre: string,
        public apellido: string,
        public contacto: string,
        public razon_social: string,
        public telefono: string,
        public mail: string,
    ) {}

    public static create(cliente: any): [string?, PostClienteDto?] {
        const clienteValidation = postClienteValidation(cliente);

        if (!clienteValidation.success) {
            return [JSON.stringify(clienteValidation.error.message)];
        }

        const data = clienteValidation.data;

        return [
            undefined,
            new PostClienteDto(
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