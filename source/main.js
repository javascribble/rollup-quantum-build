const { executeRollup } = require('./transformations/rollup.js');
const { executePostcss } = require('./transformations/postcss.js');

const [input, output] = process.argv.slice(-2);

executeRollup(input, output);
executePostcss(input, output);