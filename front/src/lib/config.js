import fs from 'fs';
import path from 'path';
import ora from 'ora';

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
    cert: fs.readFileSync(path.join('../config/jwt/public.pem')),
};
