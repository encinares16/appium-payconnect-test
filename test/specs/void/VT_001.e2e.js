import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { handleError } from "../../../helpers/errorHandler.js";
import paymentConfirmedScreen from "../../pages/payment/PaymentConfirmedScreen.js";
import AcceptPaymentScreen from "../../pages/payment/AcceptPaymentScreen.js";
import ChooseCardTypeScreen from "../../pages/payment/CardTypeScreen.js";
import TapDipPaymentScreen from "../../pages/payment/PaymentScreen.js";
import HomeScreen from "../../pages/home/HomeScreen.js";
import Activity from '../../pages/Activity.js';
import PrintReceipt from "../../pages/payment/ReceiptScreen2.js";
import VoidScreen  from "../../pages/void/VoidScreen.js";
import { numberedSteps } from "../../../helpers/customSteps.js";
import { getItemStorage } from "../../../helpers/localStorage.js";
import { validateTransaction } from "../../../helpers/assertion.js";
import { customAttachment } from "../../../helpers/customAttachment.js";
import { metadata, behaviorsData } from "../../../data/payment/void.data.js";
import { testCase, credentials, testCard, features, entryMode } from "../../../data/constants.js";
import { transactionDetails } from "../../../helpers/getTransactionDetails.js";
import { saleFlow, verifyReceiptDetails } from "../../../helpers/saleFlow.js";
import { helpers } from "../../../helpers/helpers.js";

describe(testCase.title.void, () => {
    
    let testScenario = {
       VT_001: 'VT_001: should void an existing sale transaction.',
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
                await saleFlow(amount, 'credit', null, helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.VT_001.testID);
            });

            let receiptDetailsSale = JSON.parse(getItemStorage('VT_001_2_receipt_details_sale'));

            await numberedSteps.start("Process a void transaction.", async () => {
                await HomeScreen.clickVoidTransaction()
                await VoidScreen.voidTransaction(receiptDetailsSale.traceNo)

                await numberedSteps.start("Printing transaction receipt.", async () => {
                    await PrintReceipt.printingReceipt(`${metadata.VT_001.testID}_3`); 
                })

                await numberedSteps.start("Extract the generated void receipt.", async () => {
                    await PrintReceipt.extractGeneratedReceipt(`${metadata.VT_001.testID}_3`, 'void');
                    await customAttachment("Receipt Details Void.", JSON.parse(getItemStorage('VT_001_3_receipt_details_void')) , 'json')
                })
            })

            // await numberedSteps.start("Verify Transaction Receipt Details.", async () => {
            //     await verifyReceiptDetails('VT_001_3_receipt_details_void','0029','(T)','150.00','VOID');
            // })

            await numberedSteps.start("Verify Transaction Receipt Details.", async () => {
                await verifyReceiptDetails(
                    metadata.VT_001.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.TAP,
                    helpers.formatAmount(amount),
                    features.void.toUpperCase(),
                );
            });


            // let record = 'VT_001_3_receipt_details_void';
            // let transaction = getReceiptDetails(record);
            // let merchant = getMerchantDetails();
            // let transactionType = getTransactionType(record, '0029', 'Failed to extract.','(T)','150.00','VOID');

            // await validateTransaction("Chai Assertion: merchant information on the receipt should match the configured merchant details.", transaction, merchant)
            // await validateTransaction("Chai Assertion: card and transaction information on the receipt should match.", transaction, transactionType)
            
            await numberedSteps.start("Exit the Payconnect application.", async () => {
                await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
                await HomeScreen.clickButtonConfirm();
            })

            // await VoidScreen.voidTransaction(getItemStorage('traceNumber'))
            // console.log("[VOID TRANSACTION TRACE NUMBER]: ", getItemStorage('traceNumber')) 
            // await PrintReceipt.extractGeneratedReceipt(`${metadata.VT_001.testID}_3`);
            // await HomeScreen.voidTransaction(getItemStorage('traceNumber'))
            // await VoidScreen.voidTransaction(getItemStorage('traceNumber'))
        } catch (err) {
            await handleError(err, testCase.title.void, metadata.VT_001.testID);
        } 
    });
});


