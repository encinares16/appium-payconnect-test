import Activity from '../../pages/Activity.js';
import HomeScreen from "../../pages/home/HomeScreen.js";
import { handleError } from "../../../helpers/errorHandler.js";
import { numberedSteps } from "../../../helpers/customSteps.js";
import { testCase, credentials, features, testCard } from "../../../data/constants.js";
import { metadata, behaviorsData } from "../../../data/payment/sale.data.js";
import { addMetadata, addBehaviors } from "../../../helpers/setMetadata.js";
import { saleFlow, verifyReceiptDetails } from "../../../helpers/saleFlow.js";
import { entryMode } from '../../../data/constants.js';
import { helpers } from '../../../helpers/helpers.js';

describe(testCase.title.sale, () => {

    let testScenario ={
        AP_001: 'Accept Payment - Visa (Tap, Credit) should be processed successfully.',
        AP_002: 'Accept Payment - Visa (Insert, Credit) should be processed successfully.',
        AP_003: 'Accept Payment - Visa (Tap, Debit Savings) should be processed successfully.',
        AP_004: 'Accept Payment - Visa (Insert, Debit Savings) should be processed successfully.',
        AP_005: 'Accept Payment - Visa (Tap, Debit Checking) should be processed successfully.',
        AP_006: 'Accept Payment - Visa (Insert, Debit Checking) should be processed successfully.',
    }

    // before('Launch: ', async () => {
    //     await numberedSteps.start("Launch the Payconnect application.", async () => {
    //         await Activity.launchApp();
    //     })
    // })

    // after('Close: ', async () => {
    //     await numberedSteps.start("Exit the Payconnect application.", async () => {
    //         await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
    //         await HomeScreen.clickButtonConfirm();
    //     })
    // })

    it( `AP_001: ${testScenario.AP_001}`, async () => {
        addMetadata(metadata.AP_001);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_001.testID, testCase.title.sale, testScenario.AP_001, metadata.AP_001.description);

        try {
            let amount = 5000; // 50.00
            await numberedSteps.start("Launch the Payconnect application.", async () => {
                await Activity.launchApp();
            })

            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'credit', null, helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_001.testID, 1);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_001.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.TAP,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 1
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_001.testID);
        }
    });

    it( `AP_002: ${testScenario.AP_002}`, async () => {
        addMetadata(metadata.AP_002);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_002.testID, testCase.title.sale, testScenario.AP_002, metadata.AP_002.description);

        try {
            let amount = 25000; // 25000
            // let formattedPan = testCard.VISA_TEST_CARD_2.split(' ')[3];
            
            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'credit', null, helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_002.testID, 2);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_002.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.INSERT,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 2
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_002.testID);
        }
    });

    it( `AP_003: ${testScenario.AP_003}`, async () => {
        addMetadata(metadata.AP_003);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_003.testID, testCase.title.sale, testScenario.AP_003, metadata.AP_003.description);

        try {
            let amount = 50000; // 500.00
            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'debit', 'savings', helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_003.testID, 3);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_003.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.TAP,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 3
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_003.testID);
        }
    });

    it( `AP_004: ${testScenario.AP_004}`, async () => {
        addMetadata(metadata.AP_004);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_004.testID, testCase.title.sale, testScenario.AP_004, metadata.AP_004.description);

        try {
            let amount = 99989; // 999.89
            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'debit', 'savings', helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_004.testID, 4);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_004.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.INSERT,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 4
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_004.testID);
        }
    });

    it( `AP_005: ${testScenario.AP_005}`, async () => {
        addMetadata(metadata.AP_005);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_005.testID, testCase.title.sale, testScenario.AP_005, metadata.AP_005.description);

        try {
            let amount = 100000; // 1,000.00
            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'debit', 'checking', helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_005.testID, 5);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_005.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.TAP,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 5
                );
            });
        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_005.testID);
        }
    });

    it( `AP_006: ${testScenario.AP_006}`, async () => {
        addMetadata(metadata.AP_006);
        addBehaviors(behaviorsData.epic, behaviorsData.features, behaviorsData.story);
        helpers.testInfoLogger(metadata.AP_006.testID, testCase.title.sale, testScenario.AP_006, metadata.AP_006.description);

        try {
            let amount = 120000; // 1,200.00
            await numberedSteps.start("Process sale transaction.", async () => {
                await saleFlow(amount, 'debit', 'checking', helpers.formattedPan(testCard.VISA_TEST_CARD_2), metadata.AP_006.testID, 6);
            });

            await numberedSteps.start("Verify receipt.", async () => {
                await verifyReceiptDetails(
                    metadata.AP_006.testID,
                    helpers.formattedPan(testCard.VISA_TEST_CARD_2),
                    entryMode.INSERT,
                    helpers.formatAmount(amount),
                    features.sale.toUpperCase(), 6
                );
            });

        await numberedSteps.start("Exit the Payconnect application.", async () => {
            await HomeScreen.inputTerminalPasswordField(credentials.terminalPassword.A90_SN23382825);
            await HomeScreen.clickButtonConfirm();
        })

        } catch (err) {
            await handleError(err, testCase.title.sale, metadata.AP_006.testID);
        }
    });
});