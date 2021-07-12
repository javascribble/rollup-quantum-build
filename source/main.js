const { executeRollup } = require('./transformations/rollup.js');
const { executePostcss } = require('./transformations/postcss.js');

const [project] = process.argv.slice(-1);
const input = `${project}/bundles`, output = `${project}/build`;

executeRollup(input, output);
executePostcss(input, output);