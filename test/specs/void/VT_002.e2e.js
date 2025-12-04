import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { handleError } from "../../../helpers/errorHandler.js";
import HomeScreen from "../../pages/home/HomeScreen.js";
import VoidScreen  from "../../pages/void/VoidScreen.js";
import Activity from '../../pages/Activity.js';
import { numberedSteps } from "../../../helpers/customSteps.js";
import { testCase, credentials } from "../../../data/constants.js";
import { metadata, behaviorsData } from "../../../data/payment/void.data.js";
import { helpers } from "../../../helpers/helpers.js";

describe(testCase.title.void, () => {

    let testScenario = {
       VT_002: 'VT_002: should not void if the transaction trace number does not exist.',
    }

    it(testScenario.VT_002, async () => {
        
        addMetadata(metadata.VT_002)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.VT_002.testID, testCase.title.void, testScenario.VT_002, metadata.VT_002.description);

        try {
            await numberedSteps.start("Launch the Payconnect application. test", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process a void transaction.", async () => {
                await HomeScreen.clickVoidTransaction()
                await VoidScreen.voidTransactionNotFound(999999)
            })

            await numberedSteps.start("Verify error message.", async () => {
                await VoidScreen.verifyErrorMessage(`${metadata.VT_002.testID}_1`)
            })

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })

        } catch (err) {
            await handleError(err, testCase.title.void, metadata.VT_001.testID);
        } 
    });
});


