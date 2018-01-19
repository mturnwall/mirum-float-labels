const fs = require('fs');
const mkdirp = require('mkdirp');
const sass = require('node-sass');
const importer = require('node-sass-magic-importer');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const log = require('./log');

const dir = 'demo';
const sassFilename = 'demo';

function compileSass() {
    return sass.renderSync({
        file: `./${dir}/${sassFilename}.scss`,
        outFile: `${dir}/${sassFilename}.css`,
        outputStyle: 'expanded',
        sourceMap: true,
        sourceMapContents: true,
        importer: importer(),
    });
}

function processCss(css) {
    const processor = postcss([autoprefixer]);
    processor.process(css.css, {
            from: `./${dir}/${sassFilename}.scss`,
            to: `./${dir}/${sassFilename}.css`,
            map: {
                prev: css.map.toString(),
                inline: false,
            },
        })
        .then((postResult) => {
            fs.writeFileSync(`./${dir}/${sassFilename}.css`, postResult.css, (err) => {
                if (err) {
                    console.log('writeFile error:', err);
                }
            });
        });
}

function buildCss() {
    return new Promise((resolve, reject) => {
        const result = compileSass();
        processCss(result);
        resolve();
    });
}

module.exports = {
    default: buildCss,
};

