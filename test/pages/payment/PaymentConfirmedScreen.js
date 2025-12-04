import { $ } from '@wdio/globals';
import { step } from '@wdio/allure-reporter';
import HomeScreen from '../home/HomeScreen';
import { numberedSteps } from '../../../helpers/customSteps';

export class PaymentConfirm{

    get textPaymentConfirmed() { return $('//android.widget.TextView[@text="Payment confirmed."]');}
    get textAuthCode() { return $('//android.widget.TextView[@text="Auth code: [0-9]+"]');}
    get textAmount() { return $('//android.widget.TextView[@text="Amount: ₱ [0-9]+\.[0-9]{2}"]');}
    get buttonCancel() { return $('//android.widget.Button');}

    get printCustomersCopy() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button');}
    get buttonDismiss() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]');}
    
    get reversal() { return $(`//android.widget.TextView[@text="Reversal Processing..."]`); }
    get reversalMessage() { return $(`//android.widget.TextView[@text="Please Do Another Transaction"]`); }
    get reversalOkButton() { return $(`//android.widget.Button`); }


    async transactionCompleted() {
        await numberedSteps.start(`Payment confirmed.`, async () => {
            await this.textPaymentConfirmed.waitForDisplayed();
            // await HomeScreen.takeScreenshot(testID, isEnabled);
        })
    }

    async clickButtonDismiss() {
        await this.buttonDismiss.waitForExist();
        await this.buttonDismiss.click();
    }

    async clickPrintCustomerCopy() {
        await numberedSteps.start('Print Customer Copy', async () => {
            await this.printCustomersCopy.waitForDisplayed();
            await this.printCustomersCopy.click();
        })
    }

    async retryReversal() {
        await numberedSteps.start(`Retry Reversal.`, async () => {
            let isDisplayed = (await this.reversal.waitForDisplayed()).valueOf();
            let paymentConfirmed = (await this.textPaymentConfirmed.waitForDisplayed()).valueOf();
            console.log("Reversal Processing: ", isDisplayed)
            console.log("Payment Confirmed: ",  paymentConfirmed)
            // await this.processingPaymentScreen.waitForDisplayed();
        })
    }

}

export default new PaymentConfirm();