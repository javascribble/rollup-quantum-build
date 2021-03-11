import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import { minify } from 'html-minifier';

const debug = process.argv.includes('-w');
const postcssOptions = { extract: 'main.css', minimize: !debug };
const minifyOptions = { minifyCSS: true, minifyJS: true, collapseWhitespace: true };
const babelOptions = { babelHelpers: 'bundled', plugins: ["@babel/plugin-syntax-class-properties"] };

const minifyPlugin = {
    name: 'minify',
    transform(text, path) {
        if (path.includes('template')) {
            return minify(text, minifyOptions);
        }
    }
};

const developmentPlugins = [];
const productionPlugins = [minifyPlugin, terser()];
const plugins = [
    resolve(),
    commonjs(),
    babel(babelOptions),
    postcss(postcssOptions),
    ...(debug ? developmentPlugins : productionPlugins)
];

export default (input, output) => ({
    plugins,
    input,
    output: {
        file: `${output}/main.js`,
        format: 'es'
    }
});