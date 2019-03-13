import chalk from 'chalk';

import { app, common, compiler, devServer } from './app';

common.spinner.info(chalk.default.magenta('Development mode')).info('Building development server...');

app.listen({ port: common.port, host: common.host }, async () => {
    await devServer(app, compiler);
});
