export class MetodoPago {
    constructor(
        public idMetodoPago: number,
        public nombre: string,
    ) {}

    //get
    public getIdMetodoPago(): number {
        return this.idMetodoPago;
    }

    public getNombre(): string {
        return this.nombre;
    }

    //set
    public setIdMetodoPago(idMetodoPago: number): void {
        this.idMetodoPago = idMetodoPago;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
}