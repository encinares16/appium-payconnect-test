import { addMetadata, addBehaviors } from '../../../helpers/setMetadata.js'
import Activity from '../../pages/Activity.js';
import HomeScreen from "../../pages/home/HomeScreen.js";
import { data, credentials } from "../../../data/testData.js";
import { handleError } from "../../../helpers/errorHandler.js";
import { numberedSteps } from '../../../helpers/customSteps.js';
import { metadata, behaviorsData } from '../../../data/authentication.data.js';
import { testCase } from '../../../data/constants.js';
import { helpers } from '../../../helpers/helpers.js';
import { executeQuery } from '../../../helpers/query.js';
import { customAttachment } from '../../../helpers/customAttachment.js';

describe(testCase.title.auth, () => {

    let testScenario = {
        AU_006: 'AU_006: (Terminal Disabled) access should be denied for Sale, Refund, Void, and Settings.',
    }

    it(testScenario.AU_006, async () => {
        
        addMetadata(metadata.AU_006);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AU_006.testID, testCase.title.auth, testScenario.AU_006, metadata.AU_006.description);
        await Activity.closeApp();
        
        try {
            let terminal;

            await numberedSteps.start("Check if the terminal is enabled.", async () => {
                terminal = await executeQuery.fetchTerminal('00023382825');
                await customAttachment('Terminal Data', terminal,'json');
                console.log("Terminal Data: ", terminal);
                
                if(terminal.isEnabled){
                    await numberedSteps.start("Terminal is enabled.", async () => {       
                        await numberedSteps.start("Disabling the terminal.", async () => {
                            await executeQuery.enableTerminal(20000234728, 0, '00023382825');
                        })
                    })
                } else {
                    await numberedSteps.start("Terminal is already disabled.", async ()=>{})
                }
            })

            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Tap any of the app features: sale, refund, void, settings.", async () => {
                await HomeScreen.clickAcceptPayment();
            })

            await numberedSteps.start("Verify app behavior.", async () => {
                await HomeScreen.verifyMessageTerminalDisabled();
                await Activity.takeScreenshot(metadata.AU_006.testID, 1);
                await HomeScreen.clickTryAgain();
            });

            let getLastUpdate = await executeQuery.fetchTerminal('00023382825');

            if(!getLastUpdate.isEnabled){
                await numberedSteps.start("Enabling the Terminal.", async () => {
                    await executeQuery.enableTerminal(20000234728, 1, '00023382825');
                });
            }

            await executeQuery.endConnection();

            await numberedSteps.start("Exit the Payconnect application properly using terminal password.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (error) {   
            await handleError(error, testCase.title.auth, metadata.AU_006.testID);
        }
    });
});
