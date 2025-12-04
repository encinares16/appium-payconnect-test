
import { severity, features, project, testCase} from "../constants.js"


export const metadata = {
    VT_001: {
        testID: 'VT_001',
        description: testCase.description.void.VT_001,
        owner: project.owner,
        tags: [project.name, features.void, `Sprint ${project.currentSprint}`],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '63477',
    },
    VT_002: {
        testID: 'VT_002',
        description: testCase.description.void.VT_001,
        owner: project.owner,
        tags: [project.name, features.void, `Sprint ${project.currentSprint}`],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '63477',
    },
}

export const behaviorsData = {
    epic: project.name,
    features: `Sprint ${project.currentSprint}`,
    story: features.void
}