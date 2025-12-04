import { $ } from '@wdio/globals';
import { numberedSteps } from '../../../helpers/customSteps';

export class ChooseCardTypeScreen{

    get textHeader() { return $('//android.widget.TextView[@text="Choose card type"]');}
    get debitButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.Button');}
    get creditButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.widget.Button');}
    get cancelButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button');}

    // Account Type Debit Screen
    get savingsButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]');}
    get checkingButton() { return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]');}

    get textInputPIN() { return $('//android.widget.TextView[@resource-id="com.vanstone.appsdk.api:id/input_tip_msg"]');}

    async selectCardType(cardType) {
        await numberedSteps.start(`Account Type: ${cardType.toUpperCase()}`, async () => {
            if(cardType === 'credit'){
                await this.creditButton.waitForDisplayed();
                await this.creditButton.click();
            } 
            if(cardType === 'debit'){
                await this.debitButton.waitForDisplayed();
                await this.debitButton.click();
            } 
        })
    }

    async selectDebitAccountType(debitAccountType) {
        await numberedSteps.start(`Debit Account Type: ${debitAccountType.toUpperCase()}`, async () => {
            if(debitAccountType === 'savings'){
                await this.savingsButton.waitForDisplayed();
                await this.savingsButton.click();
            } else if(debitAccountType === 'checking') {
                await this.checkingButton.waitForDisplayed();
                await this.checkingButton.click();
            }else {
                console.log("Invalid Account Type")
            }
        })
    }

    async verifyInputPINScreen() {
         await numberedSteps.start(`Verify Input PIN Screen: this.textInputPIN.isDisplayed()`, async () => {
            await this.textInputPIN.waitForDisplayed();
            console.log('Verify Input PIN Screen: ', this.textInputPIN.isDisplayed())
        })
    }

    // async properCase(){
    //     return this.replace(/\w\S*/g, function(txt){
    //         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    //     });
    // }
}

export default new ChooseCardTypeScreen();