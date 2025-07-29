import z from "zod";
import { PostCompraSchema } from "../compra/postCompra.validation";
import { PostProductoSchema } from "../producto/postProducto.validation";

export const PostProductoXCompraSchema = z.object({
    cantidad: z.number(),
    producto: PostProductoSchema,
    compra: PostCompraSchema,
});

export const postProductoXCompraValidation = (productoXCompra: any) => {
    return PostProductoXCompraSchema.safeParse(productoXCompra);
}