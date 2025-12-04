import { addMetadata, addBehaviors } from '../../../helpers/setMetadata.js'
import Activity from '../../pages/Activity.js';
import SplashScreen from '../../pages/home/SplashScreen.js';
import SettingsApp from '../../pages/SettingsApp.js';
import { handleError } from '../../../helpers/errorHandler.js';
import { expect } from 'chai';
import { numberedSteps } from '../../../helpers/customSteps.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import { testCase } from '../../../data/constants.js';
import { helpers } from '../../../helpers/helpers.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_004: 'AU_004: should prompt error message when launching app with no internet connection.',
    }

    it(testScenario.AU_004, async () => {

        addMetadata(metadata.AU_004)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_004.testID, testCase.title.auth, testScenario.AU_004, metadata.AU_004.description);
    
        try {
            await Activity.closeApp()

            const getConnection = await driver.getNetworkConnection();
            const isWiFiEnabled = (getConnection & 2) === 2 || getConnection === 6;

            await numberedSteps.start('Check if Wifi is enabled', async () => {
                if(isWiFiEnabled){
                    await numberedSteps.start('Wifi is enabled.', async () => {
                        expect(getConnection).to.equal(6);
                    })

                    await numberedSteps.start('Launch the Android Settings application.', async () => {
                        await Activity.launchSettings(); 
                    })

                    await numberedSteps.start('Go to WLAN settings and switch off the Wifi.', async () => {
                            await SettingsApp.toggleOffWifi();
                            await Activity.takeScreenshot(metadata.AU_004.testID, 1);
                        })
                    await numberedSteps.start('Exit the Android Settings application', async () => {
                        await SettingsApp.exitSettingsApp();
                    });
                } else {
                    await numberedSteps.start('Wifi is already disabled.', async () => {
                        expect(getConnection).not.equal(6);
                        // console.log('Wifi is already disabled');
                    });
                }
            });

            await numberedSteps.start('Launch the Payconnect application.', async () => {
                await Activity.launchApp();
            });

            await numberedSteps.start('Verify error message.', async () => {
                await SplashScreen.verifyErrorMessage();
                await Activity.takeScreenshot(metadata.AU_004.testID, 2);
            });

            await numberedSteps.start('Exit the Payconnect application.', async () => {
                await Activity.closeApp();
            });

            await Activity.launchSettings(); 
            await SettingsApp.toggleOffWifi();
            await SettingsApp.exitSettingsApp();

        } catch (error) {
            await handleError(error, testCase.title.auth, metadata.AU_004.testID);
        }
    });
});
