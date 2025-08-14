import { AppRoutes } from './presentation/app.routes';
import { type Options, Server } from './presentation/server';

async function main(): Promise<void> {
  const OPTIONS: Options = {
    port: 3003,
    routes: AppRoutes.routes
  };

  new Server(OPTIONS).start();
}

main().catch((error) => {
  console.error('Error al iniciar el servidor:', error);
});