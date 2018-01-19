const fse = require('fs-extra');
const run = require('./run');
const clean = require('./clean');
const buildJs = require('./build-js');
const log = require('./log');

async function build() {
    try {
        await run(clean);
        await run(buildJs);
        fse.copy('./src/float-label.scss', './dist/scss/float-label.scss', err => {
            if (err) {

            } else {
                log('success', 'scss file copied');
            }
        });
    } catch(err) {
        log('error', `build error: ${err}`);
    }
}

module.exports = {
    default: build,
};
