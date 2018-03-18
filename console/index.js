const chalk = require('chalk');
const log = console.log;

 
const y = chalk.yellow.bind(chalk);
const m = chalk.magenta.bind(chalk);
const g = chalk.green.bind(chalk);
const r = chalk.red.bind(chalk);
const b = chalk.blueBright.bind(chalk);

module.exports = {
  y,
  m,
  g,
  r,
  b
}