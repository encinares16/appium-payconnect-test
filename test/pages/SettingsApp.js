import { $, driver } from '@wdio/globals';
import { step } from '@wdio/allure-reporter';
import HomeScreen from './home/HomeScreen';
import Activity from './Activity';

export class SettingsApp {

    get getWifiSettings() { return $('(//android.widget.LinearLayout[@resource-id="com.android.settings:id/dashboard_tile"])[1]'); }
    get connectedTo() { return $('//android.widget.TextView[@resource-id="android:id/summary"]'); }
    get toggleSwitch() { return $('//android.widget.Switch[@resource-id="com.android.settings:id/switch_widget"]'); }
    get message() { return $('//android.widget.TextView[@resource-id="android:id/empty"]'); }

    // get isConnected() { return $('//android.widget.TextView[@resource-id="android:id/summary" and @text="Connected"]'); }
    // get wifiStatus() { return $('//android.widget.TextView[@resource-id="com.android.settings:id/switch_text"]'); }

    async toggleOffWifi() {
        await this.getWifiSettings.waitForDisplayed();
        await this.getWifiSettings.click();

        await this.toggleSwitch.waitForDisplayed();
        await this.toggleSwitch.click();

        await this.message.waitForDisplayed();
    }

    async exitSettingsApp() {
        await driver.back();
        await driver.back();
        await Activity.closeSettings();
    }
}

export default new SettingsApp();