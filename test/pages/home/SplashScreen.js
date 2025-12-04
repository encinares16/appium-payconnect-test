import { $ } from '@wdio/globals';
import { addAttachment, step } from '@wdio/allure-reporter';
import { expect } from 'chai';
import { numberedSteps } from '../../../helpers/customSteps';
import { verifyMessage } from '../../../helpers/customAssertion';

export class SplashScreen{

    get loadingAnimation() { return $('//android.widget.ProgressBar'); }
    get bottomText() { return $('//android.widget.TextView[@text="Powered by:"]'); }

    get errorMessage() { return $('//android.widget.TextView[@text="Oops. There was a problem in authentication..."]'); }
    get errorCode() { return $('//android.widget.TextView[@text="Error code: 10001\n\nConnection error..."]'); }
    // get errorCode() { return $('//*[contains(text(), "Error code: 10001")]'); }

    get messageErrorGettingKeys() { return $('//android.widget.TextView[@text="Error Getting Keys..."]'); }
    get buttonOK() { return $('//android.view.ViewGroup/android.view.View/android.view.View/android.view.View/android.view.View'); }

    async waitLoadingAnimation() {
        await numberedSteps.start('Wait for the splashscreen to finish.', async () => {
            await this.loadingAnimation.waitForDisplayed();
            await this.bottomText.waitForDisplayed();
        })
    }

    async verifyErrorMessage() {
        await this.errorMessage.waitForDisplayed();
        await this.errorCode.waitForDisplayed();

        let actualErrorMessage = (await this.errorMessage.getText()).valueOf();
        let actualErrorCode = (await this.errorCode.getText()).valueOf();
        let expectedError = {
            message: 'Oops. There was a problem in authentication...',
            code: 'Error code: 10001'
        }

        await verifyMessage('Chai Assertion: Error message must be displayed when the app is launched without an internet connection.', actualErrorMessage, expectedError.message);
        expect(actualErrorCode).to.contain(expectedError.code);
        addAttachment('Error message & code', actualErrorMessage + actualErrorCode, 'text/plain');
    }

    async verifyErrorGettingKeysMessage() {
        await this.messageErrorGettingKeys.waitForDisplayed();
        let actualErrorMessage = (await this.messageErrorGettingKeys.getText()).valueOf();
        let expectedErrorMessage = 'Error Getting Keys...';
        await verifyMessage('Chai Assertion: Error getting keys message must be displayed an error message when it is launched without the Master Key injected.', actualErrorMessage, expectedErrorMessage);
    }

    async clickButtonOK() {
        await this.buttonOK.waitForDisplayed();
            // await expect.soft(await this.messageErrorGettingKeys.getText()).toEqual('Error Getting Keys')
        await this.buttonOK.click();
    }
}

export default new SplashScreen();