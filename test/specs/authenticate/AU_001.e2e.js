import { helpers } from '../../../helpers/helpers.js';
import { testCase } from '../../../data/constants.js';
import { credentials } from '../../../data/testData.js';
import { handleError } from '../../../helpers/errorHandler.js';
import { numberedSteps } from '../../../helpers/customSteps.js';
import { addMetadata, addBehaviors} from '../../../helpers/setMetadata.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import Activity from '../../pages/Activity.js'
import HomeScreen from '../../pages/home/HomeScreen.js';
import SplashScreen from '../../pages/home/SplashScreen.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_001: 'AU_001: should display an error when the Terminal Master Key is not injected.',
    }

    it(testScenario.AU_001, async () => {

        addMetadata(metadata.AU_001);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_001.testID, testCase.title.auth, testScenario.AU_001, metadata.AU_001.description);

        try {
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start('Verify Error Message.', async () => {
                await SplashScreen.verifyErrorGettingKeysMessage();
                await Activity.takeScreenshot(metadata.AU_001.testID, 1);
                await SplashScreen.clickButtonOK();
            })

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (error) {
            await handleError(error, testCase.title.auth, metadata.AU_001.testID);
        }
    });
});
