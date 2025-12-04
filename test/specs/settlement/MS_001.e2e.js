import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { handleError } from "../../../helpers/errorHandler.js";
import HomeScreen from "../../pages/home/HomeScreen.js";
import Activity from '../../pages/Activity.js';
import { numberedSteps } from "../../../helpers/customSteps.js";
import { metadata, behaviorsData } from "../../../data/payment/settlement.data.js";
import { testCase, credentials, testCard, features, entryMode } from "../../../data/constants.js";
import { helpers } from "../../../helpers/helpers.js";
import { navHelper } from "../../../helpers/navigationHelper.js";
import PrintReceipt from "../../pages/payment/ReceiptScreen2.js";
import { saleFlow } from "../../../helpers/saleFlow.js";
import MakeSettlement from "../../pages/settlement/MakeSettlement.js";
import { getItemStorage } from "../../../helpers/localStorage.js";

describe(testCase.title.settlement, () => {
    
    let testScenario = {
       MS_001: 'MS_001: should settle all transactions in the batch and print a settlement report or receipt.',
    }

    it(testScenario.MS_001, async () => {
        addMetadata(metadata.MS_001)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.MS_001.testID, testCase.title.settlement, testScenario.MS_001, metadata.MS_001.description);

        try {

            await numberedSteps.start("Launch the Payconnect application", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process sale transactions.", async () => {
                await saleFlow(2000, 'credit', null, helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.MS_001.testID, 1);
            });

            await numberedSteps.start("Process a settlement.", async () => {
                await HomeScreen.clickMakeSettlement();
                await MakeSettlement.clickButtonConfirm();
            })

            await numberedSteps.start("Printing transaction receipt.", async () => {
                await PrintReceipt.printingReceipt();
                await Activity.takeScreenshot(`${metadata.MS_001.testID}_3`, 1);
            })

            await numberedSteps.start("Printing Settlement Report.", async () => {
                await PrintReceipt.extractGeneratedReceiptSettlement(`${metadata.MS_001.testID}_3`, 1, 'settlement');
            })

            let settlement = JSON.parse(getItemStorage('MS_001_3_receipt_details_settlement'))
            console.log(settlement)

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (err) {
            await handleError(err, testCase.title.settlement, metadata.MS_001.testID);
        } 
    });
});


