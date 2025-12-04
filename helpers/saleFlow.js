import { numberedSteps } from "./customSteps"
import Activity from "../test/pages/Activity";
import HomeScreen from "../test/pages/home/HomeScreen";
import AcceptPaymentScreen from "../test/pages/payment/AcceptPaymentScreen";
import ChooseCardTypeScreen from "../test/pages/payment/CardTypeScreen";
import TapDipPaymentScreen from "../test/pages/payment/PaymentScreen";
import PaymentConfirmedScreen from "../test/pages/payment/PaymentConfirmedScreen";
import PrintReceipt from "../test/pages/payment/ReceiptScreen2";
import { customAttachment } from "./customAttachment";
import { getItemStorage } from "./localStorage";
import { transactionDetails } from "./getTransactionDetails";
import { validateTransaction } from "./customAssertion";
import { addArgument } from "@wdio/allure-reporter";

export const saleFlow = async (amount, cardType, accountType, cardUsed, testID, screenshotID) => {

    await numberedSteps.start("Tap the Accept Payment button.", async () => {
        await HomeScreen.clickAcceptPayment();
    })

    await numberedSteps.start("Input the transaction amount.", async () => {
        await AcceptPaymentScreen.setAmount(amount) //Php XX.XX
        await Activity.hideAndroidKeyboard();
        await AcceptPaymentScreen.clickConfirmButton();
    })

    await numberedSteps.start("Choose the card type.", async () => {
        if(cardType === 'credit') {
            await ChooseCardTypeScreen.selectCardType(cardType)
        } else if(cardType === 'debit') {
            await ChooseCardTypeScreen.selectCardType(cardType)
            if(accountType === 'savings'){
                await ChooseCardTypeScreen.selectDebitAccountType('savings')
            } else {
                await ChooseCardTypeScreen.selectDebitAccountType('checking')
            }
        } else {
            console.log("Invalid Card Type")
        }
    })

    await numberedSteps.start("Pay the transaction.", async () => {
        await TapDipPaymentScreen.waitForPayment();
        await TapDipPaymentScreen.thankYouPage();
        await PaymentConfirmedScreen.transactionCompleted();
        addArgument('Card Number:',`**** **** **** ${cardUsed}`)
        await Activity.takeScreenshot(`${testID}_1`, screenshotID);
    })

    await numberedSteps.start("Print transaction receipt.", async () => {
        await PrintReceipt.printingReceipt();
        await Activity.takeScreenshot(`${testID}_2`, screenshotID);
    })

    await numberedSteps.start("Extract the generated receipt.", async () => {
        await PrintReceipt.extractGeneratedReceipt(`${testID}_2_${screenshotID}`, 'sale');
        await customAttachment("Receipt Details Sale.", JSON.parse(getItemStorage(`${testID}_2_${screenshotID}_receipt_details_sale`)), 'json')
        await PaymentConfirmedScreen.clickButtonDismiss();
    })
}

export const verifyReceiptDetails = async (testID, cardNUmber, mode, amount, type, screenshotID) => {
    let fileName = 
        (type === 'SALE')
        ? `${testID}_2_${screenshotID}_receipt_details_${type.toLowerCase()}` 
        : `${testID}_3_${screenshotID}_receipt_details_${type.toLowerCase()}`;
    
    // console.log('File: ', fileName)
    // console.log('Transaction Type: ', type)
    
    let details = transactionDetails.getReceiptDetails(fileName);
    let merchant = transactionDetails.getMerchantDetails();
    let transactionType = transactionDetails.getTransactionType(fileName, cardNUmber, mode, amount, type)
    await validateTransaction("Chai Assertion: merchant information on the receipt should match the configured merchant details.", details, merchant)
    await validateTransaction("Chai Assertion: card and transaction information on the receipt should match.", details, transactionType)
}
