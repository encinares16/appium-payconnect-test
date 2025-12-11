import * as os from "os"
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

export const config = {
    runner: 'local',
    port: 4723,
    // outputDir: './logs', // Directory to store all log files
    specs: [
        // './test/specs/**/*.js',
        // './test/specs/draft/*.js'   ,
        // './test/specs/sale/*.js',
        // './test/specs/void/*.js',
        // './test/specs/authenticate/*.e2e.js',
        // './test/specs/authenticate/AU_005.e2e.js',
        './test/specs/authenticate/AU_007.e2e.js',
        // './test/regression/sale/*.js',
        // './test/regression/void/*.js',
        // './test/specs/settlement/*.js',
    ],
    exclude: [
        // './test/dontrun/**/*.js'
    ],
    maxInstances: 1,
    capabilities: [{
        platformName: "Android",
        "appium:automationName": "UiAutomator2",
        "appium:deviceName": process.env.A90_SERIAL, //A90
        "appium:platformVersion": process.env.A90_ANDROID_VERSION,
        "appium:appPackage": process.env.PAYCONNECT_PACKAGE,
        "appium:appActivity": process.env.PAYCONNECT_MAIN_ACTIVITY,
        'appium:noReset': true,
        "appium:skipDeviceInitialization": true,
        "appium:skipServerInstallation": true 
    }],
    logLevel: 'silent', // Level of logging verbosity: trace | debug | info | warn | error | silent
    bail: 0,
    waitforTimeout: 120000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    // specFileRetries: 1,
    // specFileRetriesDelay: 0,
    // specFileRetriesDeferred: false,
    reporters: [
    'spec',
        [
            'allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            disableMochaHooks: true,
            disableAssertions: false,
            // addConsoleLogs: true, // Display console logs in terminal
            reportedEnvironmentVars: { 
                "System": "Payconnect 2.0",
                "Payconnect Android App Version": "2.2.20u",
                "Device Model & Brand Name": "A90, Aisino Vanstone",
                "Environment": "Test Environment",
                "Node Version": process.version,
                "OS Platform, Release, & Version": `${os.platform()}, ${os.release()}, ${os.version()}`,
            },}
        ]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },
}
