require('@babel/register')({
    cache: true,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current',
                },
                ignoreBrowserslistConfig: true,
            },
        ],
        '@babel/preset-react',
    ],
});
require('regenerator-runtime/runtime');

const path = require('path');
const fs = require('fs');

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
    console.error(`❌ Runner doesn't exist: ${script}`);
    process.exit(1);
}

console.log(`⚙️ Worker ${process.pid} started...`);
require(script);
