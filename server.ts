import { Context, Hono } from "hono";
import client from "./src/database/connection.ts";
import { logger } from "./src/middlewares/logger.ts";
import userRoute from "./src/routes/users.route.ts";

export const app = new Hono();
app.use('*', logger);
app.route('/api/v0/users', userRoute);
app.get('/', (context: Context) => context.text('Wellcome'));

Deno.serve({ port: 3008 }, app.fetch);
Deno.addSignalListener("SIGINT", async () => {
    console.log("\nClosing connection to PostgreSQL...");
    await client.end();
    console.log("Connection sucessfuly disconected")
});