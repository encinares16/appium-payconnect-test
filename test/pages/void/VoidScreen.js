// import * as fs from "fs";
import { $ } from '@wdio/globals';
import Activity from '../Activity.js';
import{ step, addArgument, addAttachment } from '@wdio/allure-reporter';
import { numberedSteps } from '../../../helpers/customSteps';
import { verifyMessage } from '../../../helpers/customAssertion';

export class VoidScreen {
    get traceNumberVoidInput() {return $('//android.widget.EditText[@text="000000"]'); }
    get buttonVoidSubmitConfirm() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]'); }
    
    get verifyTransaction() {return $('//android.widget.TextView[@text="Confirm Details"]'); }
    get textTraceNo() {return $('//android.widget.TextView[@text="Trace No"]'); }
    get textAmount() {return $('//android.widget.TextView[@text="₱  5.00"]'); }

    // get errorMessage() {return $('//android.widget.TextView[@text="Not found"]'); }
    get errorMessage() {return $(`//android.widget.TextView[@text="Trace number doesn't exist."]`); }
    get buttonOK() {return $(`//android.widget.Button`); }

    // get errorNull() {return $(`//android.widget.TextView[@text="Error..."]`); }
    // get errorNull() {return $(`//android.widget.TextView[@text="Error..."]`); }

    async voidTransaction(traceNo){
        
        await numberedSteps.start(`Input the transaction trace number.`, async () => {
            await this.traceNumberVoidInput.waitForDisplayed();
            await this.traceNumberVoidInput.setValue(traceNo);
            await addArgument("Trace Number", traceNo)
            await Activity.hideAndroidKeyboard();
            
            await this.buttonVoidSubmitConfirm.waitForDisplayed();
            await this.buttonVoidSubmitConfirm.click();
            
            await this.verifyTransaction.waitForDisplayed();

            await this.buttonVoidSubmitConfirm.waitForDisplayed();
            await this.buttonVoidSubmitConfirm.click();

            await this.buttonOK.waitForDisplayed({ reverse: true, timeout: 5000 });
            await this.errorNull.waitForDisplayed({ reverse: true, timeout: 5000 });
        })
    }

    async voidTransactionNotFound(traceNo){
        await numberedSteps.start(`Input any trace number that does not exist.`, async () => {
            await this.traceNumberVoidInput.waitForDisplayed();
            await this.traceNumberVoidInput.setValue(traceNo);
            await addArgument("Trace Number", traceNo)
            await Activity.hideAndroidKeyboard();
            
            await this.buttonVoidSubmitConfirm.waitForDisplayed();
            await this.buttonVoidSubmitConfirm.click();
            
            await this.errorMessage.waitForDisplayed();
        })
    }

    async verifyErrorMessage(testID, screenshotID) {
        let errorMessage = (await this.errorMessage.getText()).valueOf()
        await verifyMessage('Chai Assertion: should display error message if trace number does not exist', errorMessage, "Trace number doesn't exist.")
        await Activity.takeScreenshot(testID, screenshotID);
        await this.buttonOK.waitForDisplayed();
        await this.buttonOK.click();
    }
}

export default new VoidScreen();