
import HomeScreen from "../test/pages/home/HomeScreen"
import MakeSettlement from "../test/pages/settlement/MakeSettlement";

export const navHelper = (() => {
    const checkSettledTransaction = async () => {
        await HomeScreen.clickMakeSettlement();
        await MakeSettlement.settleTransaction();
        // await MakeSettlement.settleTransaction();
    }

    const settledTransaction = async () => {
        await HomeScreen.clickMakeSettlement();
        await MakeSettlement.makeSettlement();
        // await MakeSettlement.settleTransaction();
    }

    return { checkSettledTransaction, settledTransaction }
})()