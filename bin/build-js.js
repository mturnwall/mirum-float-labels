const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const log = require('./log');

const inputOptions = {
    input: './src/float-label.js',
    plugins: [
        babel()
    ]
};
const outputOptions = {
    file: './dist/float-label.browser.js',
    format: 'umd',
    name: 'floatLabel',
};

function buildJs() {
    return new Promise(async (resolve, reject) => {
        const bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
        resolve();
    });
}

module.exports = {
    default: buildJs,
};
