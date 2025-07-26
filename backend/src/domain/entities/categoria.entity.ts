export class Categoria {
    constructor(
        private idCategoria: number,
        private nombre: string,
    ) {}

    //get
    public getIdCategoria(): number {
        return this.idCategoria;
    }

    public getNombre(): string {
        return this.nombre;
    }

    //set
    public setIdCategoria(idCategoria: number): void {
        this.idCategoria = idCategoria;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
}