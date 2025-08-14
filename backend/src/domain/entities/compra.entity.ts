export class Compra {
    constructor(
        private idCompra: number,
        private fechaCompra: Date,
        private monto: number,
        private metodoPago: string,
        private idProveedor: number,
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

    public getIdProveedor(): number {
        return this.idProveedor;
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

    public setIdProveedor(idProveedor: number): void {
        this.idProveedor = idProveedor;
    }
}