
import { severity, features, project, testCase} from "../constants.js"


export const metadata = {
    MS_001: {
        testID: 'MS_001',
        description: testCase.description.settlement.MS_001,
        owner: project.owner,
        tags: [project.name, features.settlement, `Sprint ${project.currentSprint}`],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '63477',
    },
}

export const behaviorsData = {
    epic: project.name,
    features: `Sprint ${project.currentSprint}`,
    story: features.settlement
}