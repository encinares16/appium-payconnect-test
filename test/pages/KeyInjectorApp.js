import { $} from '@wdio/globals';
import { credentials } from '../../data/constants';
import { numberedSteps } from '../../helpers/customSteps';
import { verifyMessage } from '../../helpers/customAssertion';

export class KeyInjector{

    get textHeader() { return $('//android.widget.TextView[@text="Key Injector Application"]'); }
    get buttonAddIcon() { return $('//android.widget.ImageButton[@resource-id="com.example.keyinjectorapp:id/fab"]'); }

    get textWriteSecurityKey() { return $('//android.widget.TextView[@resource-id="com.example.keyinjectorapp:id/textView"]'); }
    get masterKeyInputField() { return $('//android.widget.EditText[@resource-id="com.example.keyinjectorapp:id/etMkeyInput"]'); }
    get saveButton() { return $('//android.widget.Button[@resource-id="com.example.keyinjectorapp:id/btnLogin"]'); }
    get clearButton() { return $('//android.widget.Button[@resource-id="com.example.keyinjectorapp:id/btnClear"]'); }
    get cancelButton() { return $('//android.widget.ImageView[@resource-id="com.example.keyinjectorapp:id/ivExitDiag"]'); }

    get titleAlert() { return $('//android.widget.TextView[@resource-id="com.example.keyinjectorapp:id/alertTitle"]'); }
    get textValueKCV() { return $('//android.widget.TextView[@resource-id="android:id/message"]'); }
    get buttonConfirm() { return $('//android.widget.Button[@resource-id="android:id/button1"]'); }
    get buttonRetry() { return $('//android.widget.Button[@resource-id="android:id/button2"]'); }
    
    async inputMasterKey() {
        await numberedSteps.start(`Tap the Add (+) button.`, async () => {
            await this.clickAddIconButton()
        });

        await numberedSteps.start(`Input Master Key.`, async () => {
            await this.masterKeyInputField.waitForDisplayed();
            await this.masterKeyInputField.setValue(credentials.terminalMasterKeySBX)
        });

        await numberedSteps.start(`Tap Save button.`, async () => {
            await this.saveButton.waitForDisplayed();
            await this.saveButton.click()
        });
    }

    async clickAddIconButton() {
        await this.buttonAddIcon.waitForDisplayed();
        await this.buttonAddIcon.click();
    }

    async verifyValueKCV() {
        await this.textValueKCV.waitForDisplayed();
        let valueKCV = (await this.textValueKCV.getText()).valueOf();
        let expectedValue = '7F5B52';
        await this.buttonConfirm.waitForDisplayed();
        await this.buttonConfirm.click();
        await verifyMessage('Chai Assertion: The KCV value must be validated as correct.', valueKCV, expectedValue)
    }
}

export default new KeyInjector();