import { Factura } from "./factura.entity";
import { Proveedor } from "./proveedor.entity";

export class Compra {
    constructor(
        private idCompra: number,
        private fechaCompra: Date,
        private monto: number,
        private metodoPago: string,
        private proveedor: number,
    ) {}

    //get
    public getIdCompra(): number {
        return this.idCompra;
    }

    public getFechaCompra(): Date {
        return this.fechaCompra;
    }

    public getMonto(): number {
        return this.monto;
    }

    public getMetodoPago(): string {
        return this.metodoPago;
    }

    public getProveedor(): number {
        return this.proveedor;
    }

    //set
    public setIdVenta(idCompra: number): void {
        this.idCompra = idCompra;
    }

    public setFechaCompra(fechaCompra: Date): void {
        this.fechaCompra = fechaCompra;
    }

    public setMonto(monto: number): void {
        this.monto = monto;
    }

    public setMetodoPago(metodoPago: string): void {
        this.metodoPago = metodoPago;
    }

    public setProveedor(proveedor: number): void {
        this.proveedor = proveedor;
    }
}