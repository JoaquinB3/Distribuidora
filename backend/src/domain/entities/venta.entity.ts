export class Venta {
    constructor(
        private idVenta: number,
        private fechaVenta: Date,
        private monto: number,
        private metodoPago: string,
        private idCliente: number,
    ) {}

    //get
    public getIdVenta(): number {
        return this.idVenta;
    }

    public getFechaVenta(): Date {
        return this.fechaVenta;
    }

    public getMonto(): number {
        return this.monto;
    }

    public getMetodoPago(): string{
        return this.metodoPago;
    }

    public getIdCliente(): number {
        return this.idCliente;
    }

    //set
    public setIdVenta(idVenta: number): void {
        this.idVenta = idVenta;
    }

    public setFechaVenta(fechaVenta: Date): void {
        this.fechaVenta = fechaVenta;
    }

    public setMonto(monto: number): void {
        this.monto = monto;
    }

    public setMetodoPago(metodoPago: string): void {
        this.metodoPago = metodoPago;
    }

    public setIdCliente(idCliente: number): void {
        this.idCliente = idCliente;
    }
}