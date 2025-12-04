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

    let testScenario = {
       AP_004: 'AP_004: Accept Payment - Visa card transaction (Dip, Debit Savings Account) should be processed successfully.',
    }

    it(testScenario.AP_004, async () => {
        addMetadata(metadata.AP_004)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(testCase.title.auth, testScenario.AP_004, metadata.AP_004.description)
        
        try {
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process a sale transaction.", async () => {
                await saleFlow(15000,'debit','savings',metadata.AP_004.testID);
            })

            await numberedSteps.start("Verify Transaction Receipt Details.", async () => {
                // await verifyReceiptDetails('AP_004_2_receipt_details_sale','0029','Failed to extract.',entryMode.dip,'150.00','SALE');
                await verifyReceiptDetails('AP_004_2_receipt_details_sale','0029',entryMode.dip,'150.00','SALE');
            })

            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_004.testID);
        } 
    });
});