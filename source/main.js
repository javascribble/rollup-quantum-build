const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const postcssImport = require('postcss-import');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require("rollup-plugin-terser");
const { minify } = require('html-minifier');
const { rollup } = require('rollup');

const [input, output] = process.argv.slice(-2);

const inputOptions = {
    input,
    plugins: [
        commonjs(),
        nodeResolve(),
        babel({ babelHelpers: 'bundled', plugins: ["@babel/plugin-syntax-class-properties"] }),
        postcss({ extract: 'main.css', modules: true, minimize: true, plugins: [postcssImport()] }),
        terser(),
        {
            name: 'minify',
            transform(text, path) {
                if (path.includes('template')) {
                    return minify(text, { minifyCSS: true, minifyJS: true, collapseWhitespace: true });
                }
            }
        }
    ]
};

const outputOptions = {
    file: `${output}/main.js`,
    format: 'es'
};

rollup(inputOptions).then(bundle => bundle.write(outputOptions).then(() => bundle.close()));