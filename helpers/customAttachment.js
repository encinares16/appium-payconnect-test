import { numberedSteps } from "./customSteps";
import { addAttachment } from "@wdio/allure-reporter";

export const customAttachment = async (name, content, type) => {
    await numberedSteps.start("Attach a file.", async () => {
        if(type === 'text') {
            addAttachment(name, content, "text/plain");
        } else {
            addAttachment(name, content, "application/json");
        }
    })
}


