export class Marca {
    constructor(
        private idMarca: number,
        private nombre: string,
    ) {}


    //get
    public getIdMarca(): number {
        return this.idMarca;
    }

    public getNombre(): string {
        return this.nombre;
    }

    //set
    public setIdMarca(idMarca: number): void {
        this.idMarca = idMarca;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

}