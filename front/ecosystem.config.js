module.exports = {
    apps: [
        {
            name: 'ssr',
            script: 'index.js',
            exec_interpreter: 'babel-node',
            // TODO clusters
            // exec_mode: 'cluster',
            // instances: 'max',
            exec_mode: 'fork',
            node_args: '--config-file ./babel.config.ssr.js',
            env: {
                NODE_ENV: 'development',
                RUNNER: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
                RUNNER: 'production',
            },
        },
    ],
    deploy: {
        production: {
            user: 'root',
            host: '212.224.112.28',
            ref: 'origin/master',
            repo: 'git@github.com:morphes/symfony.git',
            path: '/var/www/lp/front',
            'post-deploy':
                'yarn --production && yarn build && pm2 reload ecosystem.config.js --env production',
        },
    },
};
