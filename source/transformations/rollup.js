const commonjs = require('@rollup/plugin-commonjs');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { babel } = require('@rollup/plugin-babel');
const { terser } = require("rollup-plugin-terser");
const { minify } = require('html-minifier');
const { rollup } = require('rollup');
const fs = require('fs');

const executeRollup = (input, output) => {
    const bundles = [];
    const bundlePath = `${input}/bundles`;
    if (fs.existsSync(bundlePath)) {
        fs.readdirSync(bundlePath).forEach(file => bundles.push(`${bundlePath}/${file}`));
    }

    const inputOptions = {
        input: [`${input}/main.js`, ...bundles],
        preserveEntrySignatures: false,
        plugins: [
            commonjs(),
            nodeResolve(),
            babel({ babelHelpers: 'bundled', plugins: ["@babel/plugin-syntax-class-properties"] }),
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
        dir: output,
        format: 'es'
    };

    rollup(inputOptions).then(bundle => bundle.write(outputOptions).then(() => bundle.close()));
};

module.exports = { executeRollup };