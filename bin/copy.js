const fse = require('fs-extra');
const pkg = require('../package.json');
const log = require('./log');

function copy() {
    const srcDir = '/src';
    const destDir = '/dist';
    const files = ['float-label.scss'];
    const promises = files.map((file) => {
        const src = `.${srcDir}/${file}`;
        const dest = `.${destDir}/${file}`;
        return new Promise((resolve, reject) => {
            fse.copy(src, dest, err => {
                if (err) {
                    log('error', `There was an error copying the ${file} directory`);
                    reject();
                } else {
                    log('success', `${file} directory copied`);
                    return resolve();
                }
            })
        });
    });
    return Promise.all(promises);
}

module.exports = {
    default: copy
};
