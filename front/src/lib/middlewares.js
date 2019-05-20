import path from 'path';
// Static file handler
import koaSend from 'koa-send';
// High-precision timing, so we can debug response time to serve a request
import ms from 'microseconds';
// Enable cross-origin requests
import koaCors from 'kcors';
// Logger
import koaLogger from 'koa-logger';

import config from './config';
import ssr from './ssr';
import router from './router';

// Static file serving
const staticMiddleware = (root, immutable = true) => async (ctx, next) => {
    try {
        if (ctx.path !== '/') {
            // If we're in production, try <dist>/public first
            return await koaSend(ctx, ctx.path, {
                immutable,
                root,
            });
        }
    } catch (e) {
        /* Error? Go to next middleware... */
    }
    return next();
};

export default app => {
    app.use(
        koaLogger((str, args) => {
            const [format, method, url, status, time, length] = args;

            if (status === 500) {
                console.log('🔥', str);
                // const text = Object.entries({ method, url, time, length }).join('\n');
                // fetch(`https://integram.org/crx8r0xS-m3`, {
                //     method: 'POST',
                //     body: JSON.stringify({
                //         text: 'hello',
                //     }),
                // });
            }
        })
    )
        // CORS
        .use(koaCors())
        // Error catcher
        .use(async (ctx, next) => {
            try {
                await next();
            } catch (e) {
                console.log('Error:', e);
                ctx.status = 500;
                ctx.body = `There was an error. Please try again later. \n ${e.message}`;
            }
        })
        // Timing
        .use(async (ctx, next) => {
            const start = ms.now();
            await next();
            const end = ms.parse(ms.since(start));
            const total = end.microseconds + end.milliseconds * 1e3 + end.seconds * 1e6;
            ctx.set('Response-Time', `${total / 1e3}ms`);
        });

    // In production, check <dist>/public first
    // if (config.isProduction) {
    app.use(staticMiddleware(path.resolve(config.dist, 'public')));
    // }

    // ... and then fall-back to <root>/public
    app.use(staticMiddleware(path.resolve(config.dist, '..', 'public'), false));

    // Router
    app.use(router.allowedMethods()).use(router.routes());

    app.use(ssr);
};
