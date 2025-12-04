export const regexReceipt = (line) => {
    let toParse = { cardNumber: line.match(/CARD NO\. ([A-Za-z0-9()]+)/)?.[1] || 'Failed to extract.', }
    let parsed = { parsedCardNumber: toParse.cardNumber.match(/\([^()]*\)$/g)?.[0] || 'Failed to extract.', }
    
    let receiptDetailsRegex = {
        build: line.match(/(\d+\.\d+\.\d+\w*)-?/)?.[1] || 'Failed to extract.',
        merchant: line.match(/Appium Merch/)?.[0]?.trim() || 'Failed to extract.',
        address: line.match(/4120 Kalayaan Ave/)?.[0]?.trim() + line.match(/, Makati, Philippines/)?.[0]?.trim() || 'Failed to extract.',
        date: line.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2}[AP]M)/)?.[1] || line.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2} [AP]M)/)?.[1] || 'Failed to extract.',
        terminalId: line.match(/TID:\s*(\d+)/)?.[1] || 'Failed to extract.',
        merchantId: line.match(/MID:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
        appLabel: line.match(/APP LABEL\s+([A-Z ]+)/)?.[1]?.trim() || 'Failed to extract.',
        appId: line.match(/APP ID\s+([A-Z0-9]+)/)?.[1] || 'Failed to extract.',
        masked: "************" + toParse.cardNumber.match(/(\d{4})/)?.[0] || 'Failed to extract.',
        transactionType: line.match(/SALE|VOID/g)?.[0] || 'Failed to extract.',
        traceNo: line.match(/TRACE NO:\s*(\d+)/)?.[1] || 'Failed to extract.', 
        batchNo: line.match(/BATCH NO:0*(\d+)/)?.[1] || line.match(/BATCH N0:0*(\d+)/)?.[1] || 'Failed to extract.',
        apprCode: line.match(/APPR CODE:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to extract.',
        retrievalRefNumber: line.match(/RRN:\s*(\d+)/)?.[1] || 'Failed to extract.',
        // entryMode: toParse.cardNumber.match(/\([^()]*\)$/g)?.[0] || 'Failed to extract.',
        entryMode:  parsed.parsedCardNumber === '(1)' ? (parsed.parsedCardNumber.replace('1', ('I'))) : toParse.cardNumber.match(/\([^()]*\)$/g)?.[0] || 'Failed to extract.',
        totalAmount: line.match(/Total:\s*(\d{1,3}(?:,\d{3})*\.\d{2})/)?.[1] || 'Failed to extract.',
        receiptCopy: line.match(/MERCHANT'S COPY/) ? "MERCHANT'S COPY" : "CUSTOMERS'S COPY" || 'Failed to extract.',
    }
    return receiptDetailsRegex
}

export const regexReceiptSettlement = (line) => {
    const regex = /(SALE|VOID)\s+(\d+)\s+([\d,]+\.\d{2})/g;
    let match;
    let result = {};

    while ((match = regex.exec(line)) !== null) {
        const type = match[1].toLowerCase(); // sale or void
        const count = parseInt(match[2], 10);
        const amount = parseFloat(match[3].replace(',', '')) * 100;
        result[type] = {
            count,
            amount,
        };
    }

    let receiptDetailsRegex = {
        build: line.match(/(\d+\.\d+\.\d+\w*)-?/)?.[1] || 'Failed to Extract',
        merchant: line.match(/Appium Merch/)?.[0]?.trim() || 'Failed to Extract',
        address: line.match(/4120 Kalayaan Ave/)?.[0]?.trim() + line.match(/, Makati, Philippines/)?.[0]?.trim() || 'Failed to extract.',
        date: line.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2}[AP]M)/)?.[1] || line.match(/([A-Za-z]{3} \d{2}, \d{4} \d{2}:\d{2} [AP]M)/)?.[1] || line.match(/([A-Za-z]{3} \d{2},\d{4} \d{2}:\d{2} [AP]M)/)?.[1] || 'Failed to Extract',
        tid: line.match(/TID:\s*(\d+)/)?.[1] || 'Failed to Extract',
        mid: line.match(/MID:\s*([A-Za-z0-9]+)/)?.[1] || 'Failed to Extract',
        report: line.match(/SETTLEMENT/)?.[0]?.trim() || 'Failed to Extract',
        batchNo: line.match(/BATCH NO:0*(\d+)/)?.[1] || line.match(/BATCH N0:0*(\d+)/)?.[1] || line.match(/BATCH NO: 0*(\d+)/)?.[1] || 'Failed to extract.',
        sale: result.sale,
        void: result.void,
    }

    return receiptDetailsRegex
}