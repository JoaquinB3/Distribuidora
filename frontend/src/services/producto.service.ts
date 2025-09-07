import { Producto, ProductoDto } from "@/entities/producto";
import { api } from "@/lib/api";
import { toast } from "react-toastify";

export class ProductoService {
    static async getProducto(idProducto: number): Promise<ProductoDto> {
        try {
            const res = await api.get(`/producto/idProducto/${idProducto}`);
            
            if (res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error(`No se pudo obtener el viaje de id ${idProducto}`);
        }
    }


    static async getAll(): Promise<Producto[]> {
        try {
            const res = await api.get<ProductoDto[]>(`/producto/`);
            if(res.status !== 200) throw new Error("res.data.message");

        // Mapear idProducto a id para la UI
        const productos: Producto[] = res.data.map(p => ({
            ...p,
            id: p.idProducto!,
        }));

            return productos
        } catch (error) {
            throw new Error(`No se pudo obtener ningun producto`);
        }
    }

    static async create(producto: ProductoDto): Promise<any> {
        try {
            const res = await api.post(`/producto/create`, producto);
            if(res.status !== 200) throw new Error(res.data.message);

            return res.data
        } catch (error) {
            throw new Error("No se pudo crear el poducto intente nuevamente");
        }
    }

    static async update(idProducto: number, producto:ProductoDto): Promise<void> {
        try {
            const res = await api.patch(`/producto/update/${idProducto}`, producto);
            if (res.status !== 200) throw new Error(res.data.message);

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    static async delete(idProducto: number): Promise<void> {
        try {
            const res = await api.delete(`/producto/delete/${idProducto}`);
            if (res.status !==200) throw new Error(res.data.message);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }
}