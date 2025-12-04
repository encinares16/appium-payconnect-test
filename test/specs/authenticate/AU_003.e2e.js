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
        AU_003: 'AU_003: should launch the Payconnect app successfully and close using the terminal password.',
    }

    it(testScenario.AU_003, async () => {
        
        addMetadata(metadata.AU_003)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_003.testID, testCase.title.auth, testScenario.AU_003, metadata.AU_003.description);

        try {
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await SplashScreen.waitLoadingAnimation();
                await Activity.launchApp();
            })

            await numberedSteps.start("Check if the user proceeds in the Homescreen.", async () => {
                await HomeScreen.verifyHomeScreen();
                await Activity.takeScreenshot(metadata.AU_003.testID, 1);
            })

            await numberedSteps.start("Exit the Payconnect application using terminal password.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825, true);
                Activity.takeScreenshot(metadata.AU_003.testID, 2);
                await HomeScreen.clickButtonConfirm();
            })

        } catch (error) {
            await handleError(error, testCase.title.auth, metadata.AU_003.testID);
        }
    });
});
