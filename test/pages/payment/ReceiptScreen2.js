
import { $ } from '@wdio/globals';
import allure, { step } from '@wdio/allure-reporter';
import { createWorker } from 'tesseract.js';
import { setItemStoge } from '../../../helpers/localStorage';
import HomeScreen from '../home/HomeScreen';
import { regexReceipt, regexReceiptSettlement } from '../../../helpers/parseReceipt';
import Activity from '../Activity';

export class PrintReceipt {

    get generatedImageBitmap() { return $('//android.widget.ImageView[@content-desc="Generated Bitmap"]'); }

    async printingReceipt() {
        await this.generatedImageBitmap.waitForDisplayed();
    }

    async extractGeneratedReceipt(testID, type) {
        const worker = await createWorker('eng');
        await worker.setParameters({
            tessedit_char_whitelist: "0123456789,.-₱()abcdefghijklmnopqrstuvwxyz:; ABCDEFGHIJKLMNOPQRSTWUVXYZ'",
        });

        const recognize = await worker.recognize(`test/screenshots/Screenshot_${testID}.png`);
        await worker.terminate();

        let getTransaction = JSON.stringify(regexReceipt(recognize.data.text))
        setItemStoge(`${testID}_receipt_details_${type}`, getTransaction);
    }

    async extractGeneratedReceiptSettlement(testID, screenshotID, type){
        await tesseractWorker(testID, screenshotID, type);
    }
}

const tesseractWorker = async (testID, screenshotID, type) => {
    const worker = await createWorker('eng');
    await worker.setParameters({
        tessedit_char_whitelist: "0123456789,.-₱()abcdefghijklmnopqrstuvwxyz:; ABCDEFGHIJKLMNOPQRSTWUVXYZ'",
    });
    const recognize = await worker.recognize(`test/screenshots/Screenshot_${testID}_${screenshotID}.png`);
    await worker.terminate();

    let getTransaction = JSON.stringify(regexReceiptSettlement(recognize.data.text))
    setItemStoge(`${testID}_receipt_details_${type}`, getTransaction);
}

// export const receiptRegex = async (result) => {
//     // let receiptDetails = {
//     //     build: result.match(/(\d+\.\d+\.\d+\w*)-?/)?.[1] || 'Failed to extract.',
//     //     merchant: result.match(/(?:\n)([A-Za-z0-9 ]+)\nMakati/)?.[1]?.trim() || 'Failed to extract.',
//     //     date: result.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2}[AP]M)/)?.[1] || 'Failed to extract.',
//     //     tid: result.match(/TID:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     mid: result.match(/MID:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     appLabel: result.match(/APP LABEL\s+([A-Z ]+)/)?.[1]?.trim() || 'Failed to extract.',
//     //     appId: result.match(/APP ID\s+([A-Z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     cardNumber: result.match(/CARD NO\. ([A-Za-z0-9()]+)/)?.[1] || 'Failed to extract.',
//     //     traceNo: result.match(/TRACE NO:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     batchNo: result.match(/BATCH NO:0*(\d+)/)?.[1] || 'Failed to extract.',
//     //     rrn: result.match(/RRN:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     apprCode: result.match(/APPR CODE:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     totalAmount: result.match(/Total:\s*([0-9]+\.[0-9]{2})/)?.[1] || 'Failed to extract.',
//     //     receiptCopy: result.match(/MERCHANT'S COPY/) ? "MERCHANT'S COPY" : 'Failed to extract.',
//     // }

//     // let receiptDetails = {
//     //     build: result.match(/(\d+\.\d+\.\d+\w*)-?/)?.[1] || 'Failed to extract.',
//     //     merchant: result.match(/(?:\n)([A-Za-z0-9 ]+)\nMakati/)?.[1]?.trim() || 'Failed to extract.',
//     //     address: result.match(/4120 Kalayaan Ave/)?.[0]?.trim() + result.match(/, Makati, Philippines/)?.[0]?.trim() || 'Failed to extract.',
//     //     dateCreated: result.text.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2}[AP]M)/)?.[1] || result.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2} [AP]M)/)?.[1] || 'Failed to extract.',
//     //     terminalID: result.match(/TID:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     merchantID: result.match(/MID:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     appLabel: result.match(/APP LABEL\s+([A-Z ]+)/)?.[1]?.trim() || 'Failed to extract.',
//     //     appId: result.match(/APP ID\s+([A-Z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     transactionType: result.match(/SALE|VOID/g)?.[0] || 'Failed to extract.',
//     //     cardNumber: result.match(/CARD NO\. ([A-Za-z0-9()]+)/)?.[1] || 'Failed to extract.',
//     //     masked: "************" + cardNumber.match(/(\d{4})/)?.[0] || 'Failed to extract.',
//     //     traceNo: result.match(/TRACE NO:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     batchNo: result.match(/BATCH NO:0*(\d+)/)?.[1] || 'Failed to extract.',
//     //     retrievalRefNo: result.match(/RRN:\s*(\d+)/)?.[1] || 'Failed to extract.',
//     //     authCode: result.match(/APPR CODE:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
//     //     totalAmount: result.match(/Total:\s*([0-9]+\.[0-9]{2})/)?.[1] || 'Failed to extract.',
//     //     receiptCopy: result.match(/MERCHANT'S COPY/) ? "MERCHANT'S COPY" : 'Failed to extract.',
//     // }
    
//     await step("Reciept: ", async () => {
//         const jsonContent = JSON.stringify(receiptDetails);
//         await allure.addAttachment(`Receipt Details: `, jsonContent, 'application/json');
//         console.log("Receipt Details: ", receiptDetails)
//         console.log("TRACEEEE: ", receiptDetails.traceNo.replace(/^0+/, ''))
//         setItemStoge('traceNumber', receiptDetails.traceNo.replace(/^0+/, ''));
//     })

//     await step("Verify Entry Mode", async () => {
//         const entry = {
//             // cardNumber: receiptDetails.cardNumber,
//             // cardNumberType: typeof receiptDetails.cardNumber,
//             mode: receiptDetails.cardNumber.match(/\(T\)/g)?.[0] || receiptDetails.cardNumber.match(/\((1|I)\)/g)?.[0],
//             isMatch: receiptDetails.cardNumber.match(/\(T\)/g)?.[0] === "(T)" || receiptDetails.cardNumber.match(/\((1|I)\)/g)?.[0] === "(1)" || receiptDetails.cardNumber.match(/\((1|I)\)/g)?.[0] === "(I)",
//         }

// 		// console.log("CARD NUMBER isMatch1: ", receiptDetails.cardNumber.match(/\(T\)/g)[0] === "(T)")
// 		// console.log("CARD NUMBER isMatch2: ", receiptDetails.cardNumber.match(/\((1|I)\)/g)[0] === "(I)" )

//         if(receiptDetails.cardNumber.match(/\(T\)/g)?.[0] === "(T)"){
//             await step("Entry Mode: Tap (T)", async () => {
//                 console.log("Entry Mode: ", entry);
//                 await allure.addAttachment(`Entry Mode JSON: `, JSON.stringify(entry), 'application/json');
//             })
//         } else {
//             await step("Enty Mode: Dip (I)", async () => {
//                 console.log("Entry Mode: ", entry);
//                 await allure.addAttachment(`Entry Mode JSON: `, JSON.stringify(entry), 'application/json');
//             })
//         }
//     })
// }

export default new PrintReceipt();