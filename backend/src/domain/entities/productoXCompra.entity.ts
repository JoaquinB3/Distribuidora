import { Compra } from "./compra.entity";
import { Producto } from "./producto.entity";

export class ProductoXCompra {
    constructor(
        private idProductoXCompra: number,
        private cantidad: number,
        private idProducto: number,
        private idCompra: number,
    ) {}

    //get
    public getIdProductoXCompra(): number {
        return this.idProductoXCompra;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getIdProducto(): number {
        return this.idProducto;
    }

    public getIdCompra(): number {
        return this.idCompra;
    }

    //set
    public setIdProductOXCompra(idProductoXCompra: number): void {
        this.idProductoXCompra = idProductoXCompra;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public setIdProducto(idProducto: number): void {
        this.idProducto = idProducto;
    }
    
    public setIdVenta(idCompra: number): void {
        this.idCompra = idCompra;
    }
}