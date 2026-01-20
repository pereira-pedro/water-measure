import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";

function listRoutes(app: any) {
  const server = app.getHttpServer();
  const router = server?._events?.request?._router;
  if (!router?.stack) return;

  const routes: Array<{ method: string; path: string }> = [];

  for (const layer of router.stack) {
    if (!layer.route) continue;
    const path = layer.route.path;
    const methods = Object.keys(layer.route.methods)
      .filter((m) => layer.route.methods[m])
      .map((m) => m.toUpperCase());

    for (const method of methods) routes.push({ method, path });
  }

  routes
    .sort((a, b) => (a.path + a.method).localeCompare(b.path + b.method))
    .forEach((r) => console.log(`${r.method.padEnd(6)} ${r.path}`));
}

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  listRoutes(app);
  await app.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
