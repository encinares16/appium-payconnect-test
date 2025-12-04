import { step } from "@wdio/allure-reporter";
import { config } from "../wdio.conf";
import chalk from "chalk";

export const numberedSteps = (() => {
    const array = [0];
    const start = async (title, func ) => {
        array[array.length - 1] += 1;
        const subSteps = array.join('.');
        return step(`${subSteps}. ${title}`, async () => {
            array.push(0);
            try {
                if(config.logLevel === 'silent'){
                    console.log(chalk.bold(`STEP ${subSteps}.`), chalk.greenBright(`${title}`))
                }
                return await func();
            } finally {
                array.pop();
            }
        });
    }
  
  const reset = () => {
    array.length = 0;
    array.push(0);
  }
  return { start, reset };
})();

