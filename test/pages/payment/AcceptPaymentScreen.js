import { $ } from '@wdio/globals';
import { addArgument, step } from '@wdio/allure-reporter';
import { numberedSteps } from '../../../helpers/customSteps';

export class AcceptPaymentScreen{

    get inputAmountField() { return $('//android.widget.EditText'); }
    get headerAcceptPayment() { return $('//android.widget.TextView[@text="Accept payment"]');}
    get backButton() { return $('//android.widget.Button');}
    get phpSymbol() { return $('//android.widget.TextView[@text="₱ "]'); }
    get confirmButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button'); }

    async setAmount(amount) {
        await numberedSteps.start(`Set Amount: ₱ ${+(amount / 100).toFixed(2)}`, async () => {
            await this.inputAmountField.waitForDisplayed();
            await this.inputAmountField.addValue(amount);
            let formattedAmount = `₱ ${+(amount / 100).toFixed(2)}`;
            await addArgument('Transaction Amount:', formattedAmount)
        })
    }

    async clickConfirmButton() {
        await this.confirmButton.waitForDisplayed();
        await this.confirmButton.click();
    }
}

export default new AcceptPaymentScreen();