const postcss = require('postcss');
const cssnano = require('cssnano');
const postcssImport = require('postcss-import');
const fs = require('fs');

const executePostcss = (input, output) => {
    const inputFile = `${input}/main.css`;
    const outputFile = `${output}/main.css`;

    if (fs.existsSync(inputFile)) {
        const options = {
            from: inputFile,
            to: outputFile
        };

        const writeFile = result => {
            fs.writeFile(outputFile, result.css, () => true)
        };

        const processCSS = (error, css) => {
            if (error) {
                throw error;
            } else {
                postcss([postcssImport, cssnano]).process(css, options).then(writeFile);
            }
        };

        fs.readFile(inputFile, processCSS);
    }
};

module.exports = { executePostcss };