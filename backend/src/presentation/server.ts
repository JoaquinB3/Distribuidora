import express, { Router } from "express";
import cors from "cors";

export interface Options {
    port: number;
    routes: Router
}

export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        this.port = options.port || 3000;
        this.routes = options.routes;
    }

    async start(): Promise<void> {
        this.app.use(cors());   

        this.app.use(express.json());
        
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

