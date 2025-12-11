import { browser, driver } from '@wdio/globals';
import { addArgument } from '@wdio/allure-reporter';
import { helpers } from '../../../helpers/helpers.js';
import { testCase } from '../../../data/constants.js';
import { credentials } from '../../../data/testData.js';
import { handleError } from '../../../helpers/errorHandler.js';
import { numberedSteps } from '../../../helpers/customSteps.js';
import { addMetadata, addBehaviors} from '../../../helpers/setMetadata.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import Activity from '../../pages/Activity.js'
import HomeScreen from '../../pages/home/HomeScreen.js';
import KeyInjectorApp from '../../pages/KeyInjectorApp.js';
import SplashScreen from '../../pages/home/SplashScreen.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_002: 'AU_002: should allow the user to install and inject terminal master key.',
    }

    it(testScenario.AU_002, async () => {

        addMetadata(metadata.AU_002);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_002.testID, testCase.title.auth, testScenario.AU_002, metadata.AU_002.description);
        await Activity.closeApp();

        try {
            await numberedSteps.start('Check if the KeyInjector app is installed.', async () => {
                let isAppInstalled = (await browser.isAppInstalled('com.example.keyinjectorapp')).valueOf();
                // console.log("KeyInjector: ", isAppInstalled === true ? 'App found.' : 'App not found.'); 
                    if(!isAppInstalled){
                    await numberedSteps.start('KeyInjector application not found.', async () => {
                        await addArgument('Is KeyInjector App installed', isAppInstalled === true ? 'Yes' : 'No');
                        await numberedSteps.start('Install the KeyInjector Application.', async () => {
                            await Activity.installKeyInjectorApp();
                        })
                    })
                } else {
                    await numberedSteps.start('KeyInjector application already installed.', async () => {
                        await addArgument('Is KeyInjector App installed: ', isAppInstalled === true ? 'Yes' : 'No');
                    })
                }
            })
            await numberedSteps.start('Launch the Key Injector application.', async () => {
                await Activity.launchKeyInjectorApp();
            })

            await numberedSteps.start('Enter Terminal master key.', async () => {
                await KeyInjectorApp.inputMasterKey();
            })

            await numberedSteps.start('Verify KCV Value.', async () => {
                await KeyInjectorApp.verifyValueKCV();
                await Activity.takeScreenshot(metadata.AU_002.testID, 2);
                await driver.back();
            })

            await numberedSteps.start('Exit the KeyInjector application.', async () => {
                await Activity.closeKeyInjectorApp()  ;
            })
        } catch (error) {
            await handleError(error, testCase.title.auth, metadata.AU_002.testID);
        }
    });
});
