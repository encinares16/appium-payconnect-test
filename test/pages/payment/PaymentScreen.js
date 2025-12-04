import { $ } from '@wdio/globals';
import { step } from '@wdio/allure-reporter';
import { numberedSteps } from '../../../helpers/customSteps';

export class CardPaymentScreen{

    get textHeader() { return $('//android.widget.TextView[@text="Tap or dip card to pay"]'); }
    get paymentLogo() { return $(`//android.widget.ImageView[@content-desc="PayConnect Logo"]`); }
    get textAmount() { return $(`//android.widget.TextView[matches(@text, "Amount: ₱ [0-9]+\\.[0-9]{2}")]`); }
    get processingPaymentScreen() { return $('//android.widget.FrameLayout'); }
    get confirmButton() { return $('//android.widget.Button'); }

    get textDeclined() { return $('//android.widget.TextView[@text="Declined"]'); }
    get textInputPIN() { return $('//android.widget.TextView[@resource-id="com.vanstone.appsdk.api:id/input_tip_msg"]'); }

    get reversal() { return $(`//android.widget.TextView[@text="Reversal Processing..."]`); }
    get reversalMessage() { return $(`//android.widget.TextView[@text="Please Do Another Transaction"]`); }
    get reversalOkButton() { return $(`//android.widget.Button`); }

    async verifyAmount() { 
        await numberedSteps.start('Verify Transaction Amount', async () => {
            await this.textHeader.waitForDisplayed();
            await this.textAmount.waitForDisplayed();
            await this.textAmount.getText();
            console.log('Verify Transaction Amount', this.textAmount.getText())
        })
    }

    async waitForPayment() { 
        await numberedSteps.start(`Waiting for payment.`, async () => {
            await this.paymentLogo.waitForDisplayed();
        })
    }

    async thankYouPage() {
        await numberedSteps.start(`Processing payment.`, async () => {
            await this.processingPaymentScreen.waitForDisplayed();
            // await this.processingPaymentScreen.waitForDisplayed();
        })
    }
}

export default new CardPaymentScreen();