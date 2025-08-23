import { putClienteValidation } from "../../validations/cliente/postCliente.validation";

export class UpdateClienteDto {
    private constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public contacto?: string,
        public razon_social?: string,
        public telefono?: string,
        public mail?: string,
    ) {}

    public static create(cliente: any, id: number): [string?, UpdateClienteDto?] {
        const clienteValidation = putClienteValidation(cliente);

        if (!clienteValidation.success) {
            return [JSON.stringify(clienteValidation.error.message)];
        }

        const data = clienteValidation.data;

        return [
            undefined,
            new UpdateClienteDto(
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