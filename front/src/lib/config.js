import path from 'path';
import ora from 'ora';
import knex from 'knex';

import { createClient } from './apollo';

export default {
    client: props => createClient(props),
    nodeStats: path.resolve('./dist/node/loadable-stats.json'),
    webStats: path.resolve('./dist/public/static/loadable-stats.json'),
    dist: path.resolve('./dist'),
    isProduction: process.env.NODE_ENV === 'production',
    host: process.env.HOST || '0.0.0.0',
    port: (process.env.PORT && parseInt(process.env.PORT)) || 3000,
    spinner: ora(),
    // db: knex({
    //     client: 'pg',
    //     connection: {
    //         host: process.env.DATABASE,
    //         port: '5432',
    //         user: process.env.DB_USER || 'symfony',
    //         password: process.env.DB_PASSWORD || 'symfony',
    //         database: process.env.DB_NAME || 'symfony',
    //     },
    // }),
};
