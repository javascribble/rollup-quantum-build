const { executeRollup } = require('./transformations/rollup.js');
const { executePostcss } = require('./transformations/postcss.js');

const [input, output] = process.argv.slice(-2);

executeRollup(input, output);
executePostcss(input, output);

const folders = ['extensions', 'plugins'];
for (const folder of folders) {
    const inputFolder = `${input}/${folder}`;
    const outputFolder = `${output}/${folder}`;
    executeRollup(inputFolder, outputFolder);
    executePostcss(inputFolder, outputFolder);
}