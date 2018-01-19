import babel from 'rollup-plugin-babel';

export default {
    input: './src/float-label.js',
    output: {
        file: './dist/float-label.browser.js',
        format: 'umd',
        name: 'floatLabel',
    },
    plugins: [
        babel()
    ]
};
