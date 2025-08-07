import z from "zod";

export const PostProductoXCompraSchema = z.object({
    cantidad: z.number(),
    idProducto: z.number(),
    idCompra: z.number(),
});

export const postProductoXCompraValidation = (productoXCompra: any) => {
    return PostProductoXCompraSchema.safeParse(productoXCompra);
}