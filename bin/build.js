const run = require('./run');
const clean = require('./clean');
const buildJs = require('./build-js');
const buildCss = require('./build-css');
const copy = require('./copy');
const log = require('./log');

async function build() {
    try {
        await run(clean);
        await run(buildJs);
        await run(buildCss);
        await run(copy);
    } catch(err) {
        log('error', `build error: ${err}`);
    }
}

module.exports = {
    default: build,
};
