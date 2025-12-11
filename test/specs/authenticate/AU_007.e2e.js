import { addMetadata, addBehaviors } from '../../../helpers/setMetadata.js'
import Activity from '../../pages/Activity.js';
import HomeScreen from "../../pages/home/HomeScreen.js";
import { credentials } from "../../../data/testData.js";
import { handleError } from "../../../helpers/errorHandler.js";
import { numberedSteps } from '../../../helpers/customSteps.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import { testCase } from '../../../data/constants.js';
import { helpers } from '../../../helpers/helpers.js';
import { executeQuery } from '../../../helpers/query.js';
import { customAttachment } from '../../../helpers/customAttachment.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_007: 'AU_007: (Merchant Disabled) access should be denied for Sale, Refund, and Void.',
    }

    it(testScenario.AU_007, async () => {
        
        addMetadata(metadata.AU_007);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_007.testID, testCase.title.auth, testScenario.AU_007, metadata.AU_007.description);
        await Activity.closeApp()
        
        try {
            let merchant;

            await numberedSteps.start("Check if the merchant is enabled.", async () => {
                merchant = await executeQuery.fetchMerchant(353, 'Appium Merch');
                await customAttachment('Merchant Data', merchant,'json');
                console.log("Merchant Data: ", merchant);

                if(merchant.isEnabled){
                    await numberedSteps.start("Merchant is enabled.", async () => {       
                        await numberedSteps.start("Disabling the merchant.", async () => {
                            await executeQuery.enableMerchant(353, 0, 'Appium Merch');
                        })
                    })
                } else {
                    await numberedSteps.start("Merchant is already disabled.", async ()=>{})
                }
            })

            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Tap any of the app features: sale, refund, void, settings.", async () => {
                HomeScreen.clickVoidTransaction();
            })

            await numberedSteps.start("Verify app behavior.", async () => {
                await HomeScreen.verifyMessageMerchantDisabled();
                await Activity.takeScreenshot(metadata.AU_007.testID, 1);
                await HomeScreen.clickTryAgain();
            })

            let getLastUpdate = await executeQuery.fetchMerchant(353, 'Appium Merch');
            
            if(!getLastUpdate.isEnabled){
                await numberedSteps.start("Enabling the Merchant.", async () => {
                    await executeQuery.enableMerchant(353, 1, 'Appium Merch');
                })
            }

            await executeQuery.endConnection();

            await numberedSteps.start("Exit the Payconnect application properly using terminal password.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (error) {   
            await handleError(error, testCase.title.auth, metadata.AU_007.testID);
        }
    });
});
