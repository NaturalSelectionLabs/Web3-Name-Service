import type Koa from 'koa';

export default async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.type = 'json';

    await next();
};
