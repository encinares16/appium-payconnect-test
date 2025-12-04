import * as allure from "allure-js-commons";

export const addMetadata = async ({ testID, description, owner, tags , severity, opProject, opTicketID}) => {
    await allure.testCaseId(testID);
    await allure.description(description);
    await allure.owner(owner);
    await allure.tags(...tags);
    await allure.severity(severity);
    await allure.link("https://sbx-dashboard.payconnect.io/", "Payconnect 2.0 Portal");
    await allure.issue(`https://project.apollo.com.ph/projects/${opProject}/work_packages/${opTicketID}/activity`, `Open Project: #${opTicketID}`);
}

export const addBehaviors = async (epic, feature, story) => {
    await allure.epic(epic);
    await allure.feature(feature);
    await allure.story(story);
}