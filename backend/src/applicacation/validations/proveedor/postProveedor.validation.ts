import z from "zod";

export const PostProveedorSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    contacto: z.string(),
    razon_social: z.string(),
    telefono: z.number(),
    mail: z.string(),
});

export const postProveedorValidation = (proveedor: any) => {
    return PostProveedorSchema.safeParse(proveedor);
};