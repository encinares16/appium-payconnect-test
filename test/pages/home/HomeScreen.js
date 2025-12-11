// import * as fs from "fs";
import { $, driver } from '@wdio/globals';
import { addArgument } from "@wdio/allure-reporter";
import { numberedSteps } from '../../../helpers/customSteps.js';
import Activity from '../Activity.js';
import { verifyMessage } from '../../../helpers/customAssertion.js';

export class HomeScreen {
    
    get buttonConfirm() {return $('//android.widget.TextView[@text="Confirm"]');}
    get buttonCancel() {return $('//android.widget.TextView[@text="Cancel"]');}

    get inputPassword() {return $('//android.widget.EditText');} 
    get payconnectLogo() {return $('//android.widget.ImageView[@content-desc="PayConnect Logo"]'); }
    get settingsIcon() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]'); }
    // get textHeader() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]'); }

    get acceptPaymentButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[1]/android.widget.Button'); }
    get voidTransactionButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.widget.Button'); }
    // get makeSettlementButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[2]/android.widget.Button'); }
    get allReportsButton() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View[4]/android.widget.Button'); }

    get traceNumberVoidInput() {return $('//android.widget.EditText[@text="000000"]'); }
    get buttonVoidSubmitConfirm() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]'); }
    
    get verifyTransaction() {return $('//android.widget.TextView[@text="Confirm Details"]'); }
    get textTraceNo() {return $('//android.widget.TextView[@text="Trace No"]'); }
    get textAmount() {return $('//android.widget.TextView[@text="₱  5.00"]'); }

    get makeSettlementButton() {return $('//android.view.View[@content-desc="SETTLEMENT"]'); }
    get textPasswordIncorrect() {return $('//android.widget.TextView[@text="Password incorrect"]'); }

    //Error Messages
    get messageTerminalDisabled() {return $('//android.widget.TextView[@text="Terminal Disabled"]'); }
    get messageMerchantDisabled() {return $('//android.widget.TextView[@text="Merchant Disabled"]'); }
    get buttonTryAgain() {return $('//android.widget.TextView[@text="Try Again"]'); }

    // Click Button Activity
    async clickButtonConfirm() {
        await this.buttonConfirm.waitForDisplayed();
        await this.buttonConfirm.click();
    }
    
    async clickButtonCancel() {
        await this.buttonCancel.waitForDisplayed();
        await this.buttonCancel.click();
    }

    async clickAcceptPayment() {
        // let x = await this.test.waitForDisplayed({ reverse: true, timeout: 20000 });
        // let x = await this.test.waitForDisplayed();
        await numberedSteps.start("Tap the Accept Payment button.", async () => {
            await this.acceptPaymentButton.waitForDisplayed();
            await this.acceptPaymentButton.click();
        })
    }

    async clickVoidTransaction() {
        await numberedSteps.start(`Tap the Void Transaction button.`, async () => {
            await this.voidTransactionButton.waitForDisplayed();
            await this.voidTransactionButton.click();
        })
    }

    async clickMakeSettlement() {
        await numberedSteps.start(`Tap the Make Settlement button.`, async () => {
            await this.makeSettlementButton.waitForDisplayed();
            await this.makeSettlementButton.click();
        })
    }

    async clickTryAgain() {
        await this.buttonTryAgain.waitForDisplayed();
        await this.buttonTryAgain.click();
    }



    // Assertions
    async verifyHomeScreen() {
        let isLogoDisplayed = await this.payconnectLogo.waitForExist();
        let actualDisplay = `User proceed to the Homescreen: ${isLogoDisplayed === true ? 'Yes': 'No'}.`;
        let expectedDisplay = `User proceed to the Homescreen: Yes.`;
        await verifyMessage('Chai Assertion: the user should be directed to the home screen.', actualDisplay, expectedDisplay)
    }

    async verifyMessageInvalidPassword() {
        // const actualText = (await this.textPasswordIncorrect.waitForDisplayed()
        //     .then(() => this.textPasswordIncorrect.getText())
        // ).valueOf();
        await this.textPasswordIncorrect.waitForDisplayed();
        let actualText = (await this.textPasswordIncorrect.getText()).valueOf();
        let expectedText = 'Password incorrect';
        await verifyMessage('Chai Assertion: the user remains on the password entry screen, and the label "Password incorrect" appears.', actualText, expectedText);
    }

    async inputTerminalPasswordField(password, isAssertionEnabled) {
        await driver.back();
        await numberedSteps.start('Input Terminal Password.', async () => {
            let hasTerminalPassword =  await this.inputPassword.waitForDisplayed();
            await this.inputPassword.setValue(password);
            await addArgument("Terminal Password", password);
            if(isAssertionEnabled === true || isAssertionEnabled != undefined){
                let actualDisplay = `Terminal password enabled: ${hasTerminalPassword === true ? 'Yes': 'No'}.`;
                let expectedDisplay = 'Terminal password enabled: Yes.';
                await verifyMessage('Chai Assertion: the terminal should require a password to prevent unauthorized access.', actualDisplay, expectedDisplay);
            }
        });
    }

    async voidTransaction(traceNo) {
        await numberedSteps.start('Void Transaction', async () => {
            await this.voidTransactionButton.waitForDisplayed();
            await this.voidTransactionButton.click();
            await numberedSteps.start('Input Trace Number', async () => {
                await this.traceNumberVoidInput.waitForDisplayed();
                await this.traceNumberVoidInput.setValue(traceNo);
                await addArgument("Trace Number: ", traceNo)
                await Activity.hideAndroidKeyboard();
            })
        })
    }

    async verifyMessageTerminalDisabled() {
        await this.messageTerminalDisabled.waitForDisplayed();
        let actualText = (await this.messageTerminalDisabled.getText()).valueOf();
        let expectedText = 'Terminal Disabled';
        await verifyMessage('Chai Assertion: access should be denied when terminal is disabled.', actualText, expectedText);
    }

    async verifyMessageMerchantDisabled() {
        await this.messageMerchantDisabled.waitForDisplayed();
        let actualText = (await this.messageMerchantDisabled.getText()).valueOf();
        let expectedText = 'Merchant Disabled';
        await verifyMessage('Chai Assertion: access should be denied when assigned merchant is disabled.', actualText, expectedText);
    }
}

export default new HomeScreen();