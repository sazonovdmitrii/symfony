const config = new WeakMap();

export default class Output {
    constructor(c) {
        config.set(this, c);
    }

    // Return the Webpack client build stats
    get client() {
        return config.get(this).client;
    }

    // Return the Webpack server build stats
    get server() {
        return config.get(this).server;
    }
}
