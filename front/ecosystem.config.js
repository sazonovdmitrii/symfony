module.exports = {
    apps: [
        {
            name: 'ssr',
            script: './serverBabel/index.js',
            exec_mode: 'cluster',
            // watch: './dist/server.js',
            instances: 'max',
            restart_delay: 3000,
            env: {
                NODE_ENV: 'development',
                RUNNER: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
                RUNNER: 'production',
                SERVER: true,
            },
            vizion: false,
            log_date_format: 'DD-MM-YYYY HH:mm:ss',
        },
    ],
    deploy: {
        development: {
            user: 'root',
            host: ['212.224.112.28'],
            ref: 'origin/master',
            repo: 'git@github.com:morphes/symfony.git',
            path: '/var/www/lp/front',
            'post-deploy': 'yarn --production && yarn build && pm2 reload all',
        },
    },
};
