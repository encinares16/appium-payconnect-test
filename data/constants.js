import { Severity } from "allure-js-commons";
import dotenv from 'dotenv';
dotenv.config();

export const project = {
    name: "Payconnect 2.0 Terminal",
    owner: "Jerome Encinares",
    op: "terminal", // open project
    currentSprint: 27,
    currentBuild: '2.2.20u',
};

export const features = {
    authenticate: "Authenticate",
    sale: "Sale",
    void: "Void",
    refund: "Refund",
    balanceInquiry: "Balance Inquiry",
    cashout: "Cashout",
    settlement: "Make Settlement",
    report: "Print Report",
};

export const entryMode = {
    TAP: "(T)",
    INSERT: "(I)",
};

export const testCard = {
    VISA_TEST_CARD_2: process.env.VISA_TEST_CARD_2,
    VISA_TEST_CARD_13: process.env.VISA_TEST_CARD_13,
}

export const severity = {
    critical: Severity.CRITICAL,
    blocker: Severity.BLOCKER,
    normal: Severity.NORMAL,
    minor: Severity.MINOR,
}

export const testCase = {
    title: {
        auth: `Sprint ${project.currentSprint}: ${project.name} - Authenticate`,
        sale: `Sprint ${project.currentSprint}: ${project.name} (Visa) - Accept Payment`,
        void: `Sprint ${project.currentSprint}: ${project.name} (Visa) - Void`,
        settlement: `Sprint ${project.currentSprint}: ${project.name} (Visa) - Make Settlement`,
    },
    description: {
        authenticate: {
            AU_001: `The system should display an error message when it is launched without the **Master Key** injected.\n\n### Preconditions\n1. The terminal is connected to the internet.\n2. The terminal is registered in the Payconnect Portal.\n3. The KeyInjector app is installed.\n4. The terminal Master Key has not been injected.`,
            AU_002: `The system should allow the user to install the **KeyInjector** application and inject the **Master Key** successfully.\n\n### Preconditions\n1. The terminal is connected to the internet.\n2. The terminal is registered in the Payconnect Portal.`,
            AU_003: `The system should allow the user to proceed to the **Payconnect Main Screen** and close the app using the **Terminal Password**.\n\n### Preconditions\n1. The terminal is connected to the internet.\n2. The terminal is registered in the Payconnect Portal.\n3. The terminal Master Key is successfully injected.`,
            AU_004: `The system should display an error message with **Error Code: 10001** when launching the app with no internet connection.\n\n### Preconditions\n1. Wi-Fi or internet connection is disabled on the terminal.`,
            AU_005: `The app should not close, the user should remain on the password entry screen, and the label **Password incorrect** should appear.\n\n### Preconditions\n1. The entered terminal password is invalid.`,
            AU_006: `The system should block access to Sale, Refund, Void, and Settings when the terminal is disabled.\n\n### Preconditions\n1. The terminal is connected to the internet.\n2. The terminal is registered in the Payconnect Portal.\n3. The terminal does not have any recorded transaction data.\n4. The terminal is disabled.`,
            AU_007: `The system should block access to Sale, Refund, and Void when the merchant is disabled.\n\n### Preconditions\n1. The terminal is connected to the internet.\n2. The terminal is registered in the Payconnect Portal.\n3. The terminal does not have any recorded transaction data.\n4. The assigned merchant is disabled.`,
        },
        sale: {
            AP_001: `The system should successfully launch the Payconnect application and process card transactions using **Tap** with the account type set to **Credit**.\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Credit (CA).\n5. POS Entry Mode: Tap (T).`,
            AP_002: `The system should successfully launch the Payconnect application and process card transactions using **Insert** with the account type set to **Credit**.\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Credit (CA).\n5. POS Entry Mode: Insert (I).`,
            AP_003: `The system should successfully launch the Payconnect application and process card transactions using **Tap** with the account type set to **Debit (Savings Account)**\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Debit (Savings).\n5. POS Entry Mode: Tap (T).`,
            AP_004: `The system should successfully launch the Payconnect application and process card transactions using **Insert** with the account type set to **Debit (Savings Account)**\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Debit (Savings).\n5. POS Entry Mode: Insert (I).`,
            AP_005: `The system should successfully launch the Payconnect application and process card transactions using **Tap** with the account type set to **Debit (Checking Account)**\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Debit (Checking).\n5. POS Entry Mode: Tap (T).`,
            AP_006: `The system should successfully launch the Payconnect application and process card transactions using **Insert** with the account type set to **Debit (Checking Account)**\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale feature is enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. Account Type: Debit (Checking).\n5. POS Entry Mode: Insert (I).`,
        },
        void: {
            VT_001: `The system should allow the user to void an existing sale transaction when a valid transaction trace number is provided. If the trace number does not exist or cannot be found in the transaction history.\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale and Void features are enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. There must be at least one successful sale transaction.`,
            VT_002: `If the trace number does not exist or cannot be found in the transaction history. The system should prevent the void action and display an appropriate error message.\n\n### Preconditions\n1. Visa is supported by the terminal.\n2. Sale and Void features are enabled in the terminal.\n3. The transaction amount must be valid and not less than ₱1.00.\n4. The entered trace number must not exist in the system.`,
        },
        settlement: {
            MS_001: `The system should successfully settle all transactions in the current batch, and a settlement report or receipt should be printed.\n\n### Preconditions\n1. There must be at least one successful sale or void transaction.\n2. The terminal must be connected to a stable internet connection.`,
        }
    }
}

export const credentials = {
    terminalPassword: {
        A90_SN23382825: 123456,
    },
    terminalMasterKeySBX: process.env.SANDBOX_MASTER_KEY
}

export const terminalInfo = {
    // terminalId: 'Failed to extract.', // there ss bug in the receipt in sbx demo mode, 
    // merchanId: 'Failed to extract.', // sandbox demo, 
    // terminalId: '00000746',
    // merchanId: '000000000006033', 
    terminalId: '00000018', // TEST ENV
    assignedMerchant: 'Appium Merch',
    merchanId: '000000000006033', // SANDBOX
    merchantAddress: '4120 Kalayaan Ave, Makati, Philippines',
}

