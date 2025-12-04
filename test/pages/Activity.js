import { driver, browser } from '@wdio/globals';
import { config } from '../../wdio.conf.js';
import AllureReporter from '@wdio/allure-reporter';
import { addAttachment } from '@wdio/allure-reporter';
import { numberedSteps } from '../../helpers/customSteps.js';

export class Activity{
    async launchApp() {
        await driver.activateApp(config.capabilities.at(0)['appium:appPackage']);
        // console.log("Launch Application: ", config.capabilities.at(0)['appium:appPackage'])
    }

    async closeApp() {
        await driver.terminateApp(config.capabilities.at(0)['appium:appPackage'], {timeout: 0});
    }

    async launchSettings() {
        // console.log("Launch Settings App: ", config.capabilities.at(1)['appium:appPackage'])
        // await driver.activateApp(config.capabilities.at(1)['appium:appPackage']);
        await driver.startActivity('com.android.settings', 'com.android.settings.Settings');
    }

    
    async closeSettings(){
        await driver.terminateApp('com.android.settings', {timeout: 0});
    }
    
    async installKeyInjectorApp(){
        await driver.installApp('applications/KeyInjectorApp_v1.0.0.1.apk');
        console.log('KeyInjector v1.0.0.1 Installed Successfully')
    }
    
    async launchKeyInjectorApp(){
        await driver.startActivity('com.example.keyinjectorapp', 'com.example.keyinjectorapp.MainActivity');
    }

    async closeKeyInjectorApp(){
        await driver.terminateApp('com.example.keyinjectorapp', {timeout: 0});
    }
    
    async hideAndroidKeyboard(){
        await driver.hideKeyboard();
    }

    async scrollUp(){
        const screenSize = await driver.getWindowSize();
        await driver.executeScript("mobile: scrollGesture", [
            { direction: "up", left: screenSize.width * 0.5, top: screenSize.height * 0.5, width: screenSize.width * 0.9, height: screenSize.height * 0.9, percent: 0.25}
        ]);
    }

    async scrollDown(){
        const screenSize = await driver.getWindowSize();
        await driver.executeScript("mobile: scrollGesture", [
            { direction: "down", left: screenSize.width * 0.025, top: screenSize.height * 0.025, width: screenSize.width * 0.9, height: screenSize.height * 0.9, percent: 0.25}
        ]);
    }
 
    async takeScreenshot(testCaseId, index){
        await numberedSteps.start("Take a screenshot.", async () => {
            const screenshot = await browser.saveScreenshot(`test/screenshots/Screenshot_${testCaseId}_${index}.png`);
            const buffer = Buffer.from(screenshot, 'base64');
            addAttachment(`Screenshot_${testCaseId}.png`, buffer, 'image/png');
        })
        // await AllureReporter.startStep("Screenshot:")
        // await AllureReporter.endStep();
        // await addAttachment(testCaseId, fs.readFileSync(`test/screenshots/${testCaseId}-screenshot.png`), "image/png");
    }
}

export default new Activity();
