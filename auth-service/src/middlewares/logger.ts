import type { MiddlewareHandler } from "hono";

export const logger: MiddlewareHandler = async (context, next) => {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    const method = context.req.method;
    const url = context.req.url;
    const status = context.res.status;
    const ip = context.req.header("x-forwarded-for") || "unknown";

    const log = {
        time: new Date().toISOString(),
        method,
        url,
        status,
        duration,
        ip
    };

    console.log(JSON.stringify(log));
};
