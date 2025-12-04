import { getItemStorage } from "./localStorage.js";
import { project, terminalInfo } from "../data/constants.js";

export const transactionDetails = (() => {

    const getReceiptDetails = (record) => {
        let receiptDetails = JSON.parse(getItemStorage(record));
        let transaction = {
            build: receiptDetails.build,
            merchant: receiptDetails.merchant,
            address: receiptDetails.address,
            terminalId: receiptDetails.terminalId,
            merchantId: receiptDetails.merchantId,
            maskedPan: receiptDetails.masked,
            transactionType: receiptDetails.transactionType,
            traceNo: receiptDetails.traceNo,
            batchNo: receiptDetails.batchNo,
            entryMode: receiptDetails.entryMode,
            totalAmount: receiptDetails.totalAmount,
        }
        return transaction
    }

    const getMerchantDetails = () => {
        let merchant = {
            merchant: terminalInfo.assignedMerchant,
            address: terminalInfo.merchantAddress,
            merchantId: terminalInfo.merchanId, 
        }
        return merchant
    }

    const getTransactionType = (record, cardNumber, mode, amount, type) => {
        let transaction = JSON.parse(getItemStorage(record));
        let transactionType = {
            build: project.currentBuild,
            terminalId: terminalInfo.terminalId,
            maskedPan: `************${cardNumber}`,
            transactionType: type,
            traceNo: transaction.traceNo,
            batchNo: transaction.batchNo,
            entryMode: mode,
            totalAmount: amount,
        }
        return transactionType
    }
    return { getReceiptDetails, getMerchantDetails, getTransactionType}
})();



