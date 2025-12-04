import Activity from '../../pages/Activity.js';
import HomeScreen from "../../pages/home/HomeScreen.js";
import { metadata, behaviorsData } from "../../../data/payment/sale.data.js";
import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { testCase, credentials } from "../../../data/constants.js";
import { numberedSteps } from "../../../helpers/customSteps.js";
import { handleError } from "../../../helpers/errorHandler.js";
import { saleFlow, verifyReceiptDetails } from "../../../helpers/saleFlow.js";
import { entryMode } from '../../../data/constants.js';
import chalk from 'chalk';
import { helpers } from '../../../helpers/helpers.js';

describe(testCase.title.sale, () => {

    let testScenario ={
       AP_002: 'AP_002: Accept Payment - Visa card transaction (Dip, Credit Account) should be processed successfully.',
    }

    it(testScenario.AP_002, async () => {
        addMetadata(metadata.AP_001)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(testCase.title.auth, testScenario.AP_002, metadata.AP_002.description)
        // console.log(chalk.white.bold(testCase.title.sale))
        // console.log(chalk.white.bold(testScenario.AP_002))


        try {
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process a sale transaction.", async () => {
                await saleFlow(8000, 'credit', null, metadata.AP_002.testID);
            })

            await numberedSteps.start("Verify Transaction Receipt Details.", async () => {
                // await verifyReceiptDetails('AP_002_2_receipt_details_sale','0029', 'Failed to extract.',entryMode.dip,'80.00','SALE');
                await verifyReceiptDetails('AP_002_2_receipt_details_sale','0029', entryMode.dip,'80.00','SALE');

            })

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_002.testID);
        } 
    });
});