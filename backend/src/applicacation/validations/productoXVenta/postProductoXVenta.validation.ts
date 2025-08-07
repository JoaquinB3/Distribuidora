import z from "zod";

export const PostProductoXVentaSchema = z.object({
    cantidad: z.number(),
    idProducto: z.number(),
    idVenta: z.number(),
});

export const postProductoXVentaValidation = (productoXVenta: any) => {
    return PostProductoXVentaSchema.safeParse(productoXVenta);
}