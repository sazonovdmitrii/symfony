import path from 'path';
import fs from 'fs';
import cluster from 'cluster';

// Load env vars, for the `GRAPHQL` endpoint and anything else we need
require('dotenv').config();

// Catch CTRL/CMD+C interrupts cleanly
process.on('SIGINT', () => {
    process.exit(0);
});

// Check that we have a specified Webpack runner
if (!process.env.RUNNER) {
    console.error('No Webpack runner specified');
    process.exit(1);
}

// Path to runner
const script = path.resolve('./src/runner', `${process.env.RUNNER}.js`);

// Check that the runner exists
if (!fs.existsSync(script)) {
    console.error(`Runner doesn't exist: ${script}`);
    process.exit(1);
}

// Start the script
// test clusters for prod
if (process.env.RUNNER === 'production' && process.env.NODE_ENV === 'production') {
    if (cluster.isMaster) {
        const worker = cluster.fork();
        console.log(`Master ${process.pid} is running`);

        cluster.on('exit', (worker, exitCode) => {
            console.log(`worker ${worker.process.pid} died`);

            if (signal) {
                console.log(`worker was killed by signal: ${signal}`);
            } else if (code !== 0) {
                console.log(`worker exited with error code: ${code}`);
            } else {
                console.log('worker success!');
            }

            if (exitCode !== SUCCESS) {
                cluster.fork();
            }
        });

        const numCPUs = require('os').cpus().length;
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    } else {
        require(script);
        console.log(`Worker ${process.pid} started`);
    }
} else {
    require(script);
}
