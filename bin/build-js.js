const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const log = require('./log');
const merge = require('deepmerge');

const inputOpts = {
    input: './src/float-label.js',
    plugins: [
        babel(),
    ]
};
const inputOptsProd = {
    plugins: [
        uglify({
            compress: {
                drop_console: true,
            },
            output: {

            }
        }),
    ]
};
const outputOpts = {
    file: './dist/float-label.browser.js',
    format: 'umd',
    name: 'floatLabel',
};
const outputOptsProd = {
    file: './dist/float-label.browser.min.js',
};

function buildJs() {
    return new Promise(async (resolve, reject) => {
        try {
            let bundle = await rollup.rollup(inputOpts);
            await bundle.write(outputOpts);
            log('success', `browser version created - ${outputOpts.file.replace('./dist/', '')}`);

            // minified version
            bundle = await rollup.rollup(merge(inputOpts, inputOptsProd));
            await bundle.write(merge(outputOpts, outputOptsProd));
            log('success', `minified browser version created - ${outputOpts.file.replace('./dist/', '')}`);
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    default: buildJs,
};
