import { postMetodoPagoValidation } from "../../validations/metodoPago/postMetodoPago.validation";

export class PostMetodoPagoDto {
    private constructor(
        public nombre: string,
    ) {}

    public static create(metodoPago: any): [string?, PostMetodoPagoDto?] {
        const metodoPagoValidation = postMetodoPagoValidation(metodoPago);

        if (!metodoPagoValidation.success) {
            return [JSON.stringify(metodoPagoValidation.error.message)];
        }

        const data = metodoPagoValidation.data;

        return [
            undefined,
            new PostMetodoPagoDto(
                data.nombre,
            )
        ];
    }
}