import KoaRouter from 'koa-router';

export default new KoaRouter()
    .get('/ping', async ctx => {
        ctx.body = 'pong';
    })
    .get('/favicon.ico', async ctx => {
        ctx.status = 204;
    });
