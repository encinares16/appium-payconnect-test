import { expect } from "chai";
import { addAttachment } from "@wdio/allure-reporter";
import { numberedSteps } from "./customSteps";
import chalk from "chalk";
import { config } from "../wdio.conf";

export const verifyMessage = async (stepName, expected, actual) => {
    let assertion = {
        expected: expected,
        actual: actual
    }

    await numberedSteps.start(stepName, async () => {
        if(!config.reporters[1][1].disableAssertions){
            if(expected != actual){
                console.log("\nExpected:", chalk.red(assertion.expected) + chalk.bgRed.whiteBright.bold(' expected '));
                console.log("Actual:", chalk.red(assertion.actual) + chalk.bgRed.whiteBright.bold(' failed '));
            }
            expect(expected).to.equal(actual)
            addAttachment('Attachment Chai Assertion:', assertion, 'application/json')
            console.log("\t\tExpected:", chalk.yellow(assertion.expected) + ' ' + chalk.bgGreen.whiteBright.bold(' passed '));
            console.log("\t\tActual:", chalk.yellow(assertion.actual) + ' ' + chalk.bgGreen.whiteBright.bold(' passed '));
        } else {
            addAttachment('Attachment Chai Assertion:', "Assertion Disabled", 'application/json')
            console.log(chalk.bgYellow.whiteBright.bold(' assertion disabled '));
        }
    })
};

export const validateTransaction = async (stepName, expected, actual) => {
    let assertion = {
        expected: expected,
        actual: actual
    };
    await numberedSteps.start(stepName, async () => {
        if(!config.reporters[1][1].disableAssertions){
            expect(expected).to.deep.include(actual);
            addAttachment('Attachment Chai Assertion:', assertion, 'application/json')
            console.log(assertion, chalk.bgGreen.whiteBright.bold(' passed ')) 
        } else {
            addAttachment('Attachment Chai Assertion:', "Assertion Disabled", 'application/json')
            console.log(chalk.bgYellow.whiteBright.bold(' assertion disabled '));
        }
    })
};