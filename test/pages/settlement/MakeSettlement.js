// import * as fs from "fs";
import { $, driver } from '@wdio/globals';
import { addArgument } from "@wdio/allure-reporter";
import { numberedSteps } from '../../../helpers/customSteps.js';
import Activity from '../Activity.js';
import { verifyMessage } from '../../../helpers/customAssertion.js';

export class MakeSettlement {

    // No Transaction to Settled
    get textNoTransactionToSettled() {return $('//android.widget.TextView[@text="No Transactions to be Settled"]');} 
    get buttonOK() {return $('//android.widget.Button');} 

    get loadingAnimation() { return $('//android.widget.ProgressBar'); }

    get textHeader() {return $('//android.widget.TextView[@text="Make Settlement"]');} 
    get textTransactionDetails() {return $('//android.widget.TextView[@text="Transaction details"]');} 
    get buttonConfirm() {return $('//android.widget.TextView[@text="CONFIRM"]');} 
    
    // get buttonConfirm() {return $('//androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button');} 
    //androidx.compose.ui.platform.ComposeView/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.Button

    async clickButtonConfirm() {
        await this.loadingAnimation.waitForDisplayed({ reverse: true, timeout: 10000 });
        await this.textHeader.waitForDisplayed();

        await numberedSteps.start("Click button confirm.", async () => {
            await this.buttonConfirm.waitForDisplayed();
            await this.buttonConfirm.click();
        })

    }
}

export default new MakeSettlement();