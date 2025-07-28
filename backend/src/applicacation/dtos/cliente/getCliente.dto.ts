import { Cliente } from "../../../domain/entities/cliente.entity";

export class GetClienteDto {
    private constructor (
        public idCliente: number,
        public nombre: string,
        public apellido: string,
        public contacto: string,
        public razon_social: string,
        public telefono: number,
        public mail: string,
    ) {} 

    public static create(cliente: Cliente): GetClienteDto {
        return new GetClienteDto(
            cliente.getIdCliente(),
            cliente.getNombre(),
            cliente.getApellido(),
            cliente.getContacto(),
            cliente.getRazonSocial(),
            cliente.getTelefono(),
            cliente.getMail(),
        );
    }
}