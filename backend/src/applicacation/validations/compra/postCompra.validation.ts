import z from "zod";
import { PostFacturaSchema } from "../factura/postFactura.validation";
import { PostProveedorSchema } from "../proveedor/postProveedor.validation";
import { PostMetodoPagoSchema } from "../metodoPago/postMetodoPago.validation";

export const PostCompraSchema = z.object({
    fechaCompra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD').transform((str) => new Date(str)),
    monto: z.number(),
    metodoPago: PostMetodoPagoSchema,
    factura: PostFacturaSchema,
    proveedor: PostProveedorSchema, 
});

export const postCompraValidation = (compra: any) => {
    return PostCompraSchema.safeParse(compra);
}