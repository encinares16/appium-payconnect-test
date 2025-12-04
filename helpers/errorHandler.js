import allure from '@wdio/allure-reporter';
import Activity from '../test/pages/Activity';

export async function handleError(error, title, id) {
    console.error(`Test Title: ${title}`);
    console.error(`Test ID: ${id}`);
    console.error('Error message: ',error.stack || error.message);
    await Activity.closeApp();
    
    try {
        const screenshot = await browser.takeScreenshot();
        // allure.addAttachment(`${testTitle} - Error Screenshot`, Buffer.from(screenshot, 'base64'), 'image/png');
        allure.addAttachment(`${title} #${id} - Error Logs`, error.stack || error.message, 'text/plain');
    } catch (captureError) {
        console.error(`Failed to capture screenshot or attach logs: ${captureError.message}`);
    }
    throw error;
}