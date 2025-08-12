import { Producto } from "./producto.entity";
import { Venta } from "./venta.entity";

export class ProductoXVenta {
    constructor(
        private idProductoXVenta: number,
        private idProducto: number,
        private idVenta: number,
        private cantidad: number,
    ) {}

    //get
    public getIdProductoXVenta(): number {
        return this.idProductoXVenta;
    }

    public getCantidad(): number {
        return this.cantidad;
    }

    public getIdProducto(): number {
        return this.idProducto;
    }

    public getIdVenta(): number {
        return this.idVenta;
    }

    //set
    public setIdProductOXVenta(idProductoXVenta: number): void {
        this.idProductoXVenta = idProductoXVenta;
    }

    public setCantidad(cantidad: number): void {
        this.cantidad = cantidad;
    }

    public setIdProducto(idProducto: number): void {
        this.idProducto = idProducto;
    }
    
    public setIdVenta(idVenta: number): void {
        this.idVenta = idVenta;
    }
}