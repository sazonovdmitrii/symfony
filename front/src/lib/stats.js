import lodash from 'lodash';
import flat from 'array.prototype.flat';

// Config for `Stats` instances
const config = new WeakMap();

export default class Stats {
    constructor(stats = {}) {
        // Store a raw copy of the config
        config.set(this, stats);
    }

    // Get the full, raw stats
    get raw() {
        return config.get(this);
    }

    main(ext) {
        const { publicPath } = this.raw;
        const { siblings, files } = this.raw.chunks.find(chunk => chunk.initial);

        const scripts = flat(
            siblings
                .map(sibling => this.raw.chunks.find(chunk => chunk.id === sibling))
                .map(sibling => sibling.files)
                .concat(files)
        )
            .filter(file => file.endsWith(`.${ext}`))
            .map(file => publicPath + file);

        return scripts;
    }
}
