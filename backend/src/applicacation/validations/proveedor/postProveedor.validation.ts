import z from "zod";

export const PostProveedorSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    contacto: z.string(),
    razon_social: z.string(),
    telefono: z.string(),
    mail: z.string(),
});

export const postProveedorValidation = (proveedor: any) => {
    return PostProveedorSchema.safeParse(proveedor);
};

export const PutProveedorSchema = PostProveedorSchema.partial();
export const putProveedorValidation = (cliente: any) => {
    return PutProveedorSchema.safeParse(cliente);
};