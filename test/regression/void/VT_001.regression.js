import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { handleError } from "../../../helpers/errorHandler.js";
import HomeScreen from "../../pages/home/HomeScreen.js";
import Activity from '../../pages/Activity.js';
import PrintReceipt from "../../pages/payment/ReceiptScreen2.js";
import VoidScreen  from "../../pages/void/VoidScreen.js";
import { numberedSteps } from "../../../helpers/customSteps.js";
import { getItemStorage } from "../../../helpers/localStorage.js";
import { customAttachment } from "../../../helpers/customAttachment.js";
import { metadata, behaviorsData } from "../../../data/payment/void.data.js";
import { testCase, credentials, testCard, features, entryMode } from "../../../data/constants.js";
import { saleFlow, verifyReceiptDetails } from "../../../helpers/saleFlow.js";
import { helpers } from "../../../helpers/helpers.js";

describe(testCase.title.void, () => {
    
    let testScenario = {
       VT_001: 'VT_001: should void an existing sale transaction.',
       VT_002: 'VT_002: should not void if the transaction trace number does not exist.',
    }

    it(testScenario.VT_001, async () => {
        addMetadata(metadata.VT_001)
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.VT_001.testID, testCase.title.void, testScenario.VT_001, metadata.VT_001.description);

        try {
            let amount = 15000;
            await numberedSteps.start("Launch the Payconnect application", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'credit', null, helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.VT_001.testID, 1);
            });

            let receiptDetailsSale = JSON.parse(getItemStorage('VT_001_2_1_receipt_details_sale'));

            await numberedSteps.start("Process a void transaction.", async () => {
                await HomeScreen.clickVoidTransaction()
                await VoidScreen.voidTransaction(receiptDetailsSale.traceNo)

                await numberedSteps.start("Printing transaction receipt.", async () => {
                    await PrintReceipt.printingReceipt(); 
                    await Activity.takeScreenshot(`${metadata.VT_001.testID}_3`, 1);
                })

                await numberedSteps.start("Extract the generated void receipt.", async () => {
                    await PrintReceipt.extractGeneratedReceipt(`${metadata.VT_001.testID}_3_1`, 'void');
                    await customAttachment("Receipt Details Void.", JSON.parse(getItemStorage('VT_001_3_1_receipt_details_void')) , 'json')
                })
            })

            await numberedSteps.start("Verify Transaction Receipt Details.", async () => {
                await verifyReceiptDetails(
                    metadata.VT_001.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.TAP,
                    helpers.formatAmount(amount),
                    features.void.toUpperCase(), 1
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.void, metadata.VT_001.testID);
        } 
    });

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
                await VoidScreen.verifyErrorMessage(`${metadata.VT_002.testID}_1`, 1)
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


