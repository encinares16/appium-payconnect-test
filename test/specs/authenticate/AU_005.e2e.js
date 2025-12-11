import { addMetadata, addBehaviors } from '../../../helpers/setMetadata.js'
import Activity from '../../pages/Activity.js';
import HomeScreen from "../../pages/home/HomeScreen.js";
import SplashScreen from "../../pages/home/SplashScreen.js";
import { data, credentials } from "../../../data/testData.js";
import { handleError } from "../../../helpers/errorHandler.js";
import { numberedSteps } from '../../../helpers/customSteps.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import { testCase } from '../../../data/constants.js';
import { helpers } from '../../../helpers/helpers.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_005: 'AU_005: should prevent the user closing the app when an invalid terminal password is entered.',
    }

    it(testScenario.AU_005, async () => {
        
        addMetadata(metadata.AU_005)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_005.testID, testCase.title.auth, testScenario.AU_005, metadata.AU_005.description);

        try {
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                // await SplashScreen.waitLoadingAnimation();
                await Activity.launchApp();
            })

            await numberedSteps.start("Check if the user proceeds in the Homescreen.", async () => {
                await Activity.takeScreenshot(metadata.AU_005.testID, 1);
            })

            await numberedSteps.start("Exit the Payconnect application using incorrect terminal password.", async () => {
                await HomeScreen.inputTerminalPasswordField(123123);
                await HomeScreen.clickButtonConfirm();
                await HomeScreen.verifyMessageInvalidPassword();
                await Activity.takeScreenshot(metadata.AU_005.testID, 2);
            })

            await numberedSteps.start("Exit the Payconnect application properly but using correct terminal password.", async () => {
                await HomeScreen.clickButtonCancel();
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (error) {
            await handleError(error, testCase.title.auth, metadata.AU_005.testID);
        }
    });
});
