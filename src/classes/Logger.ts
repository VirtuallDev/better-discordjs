import chalk from 'chalk';

export default class Logger {

  prefix: string = "[Log]";
  constructor(prefix :string = "[Log]"){
    this.prefix = prefix;
  }
  
  log(message: string) {
    console.log(chalk.cyanBright(`${this.prefix}: ${message}`));
  }
  error(message: string) {
    console.log(chalk.redBright(`${this.prefix} Error: ${message}`));
  }

  success(message: string) {
    console.log(chalk.greenBright(`${this.prefix}: ${message}`));
  }
}
