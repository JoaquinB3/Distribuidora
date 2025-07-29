import z from "zod";
import { PostProductoSchema } from "../producto/postProducto.validation";
import { PostVentaSchema } from "../venta/postVenta.validation";

export const PostProductoXVentaSchema = z.object({
    cantidad: z.number(),
    producto: PostProductoSchema,
    venta: PostVentaSchema,
});

export const postProductoXVentaValidation = (productoXVenta: any) => {
    return PostProductoXVentaSchema.safeParse(productoXVenta);
}