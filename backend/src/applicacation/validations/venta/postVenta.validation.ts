import z from "zod";
import { PostMetodoPagoSchema } from "../metodoPago/postMetodoPago.validation";
import { PostFacturaSchema } from "../factura/postFactura.validation";
import { PostClienteSchema } from "../cliente/postCliente.validation";

export const PostVentaSchema = z.object({
    fechaVenta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    monto: z.number(),
    metodoPago: PostMetodoPagoSchema,
    factura: PostFacturaSchema,
    cliente: PostClienteSchema, 
});

export const postVentaValidation = (venta: any) => {
    return PostVentaSchema.safeParse(venta);
}