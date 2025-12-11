
import { severity, features, project, testCase} from "./constants.js"

export const metadata = {
    AU_001: {
        testID: 'AU_001',
        description: testCase.description.authenticate.AU_001,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '58965',
    },
    AU_002: {
        testID: 'AU_002',
        description: testCase.description.authenticate.AU_002,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '58965',
    },
    AU_003: {
        testID: 'AU_003',
        description: testCase.description.authenticate.AU_003,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '66004',
    },
    AU_004: {
        testID: 'AU_004',
        description: testCase.description.authenticate.AU_004,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '55848',
    },
        AU_005: {
        testID: 'AU_005',
        description: testCase.description.authenticate.AU_005,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '55848',
    },
        AU_006: {
        testID: 'AU_006',
        description: testCase.description.authenticate.AU_006,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '63402',
    },
        AU_007: {
        testID: 'AU_007',
        description: testCase.description.authenticate.AU_007,
        owner: project.owner,
        tags: [project.name, features.authenticate, `Sprint ${project.currentSprint}`],
        severity: severity.critical,
        opProject: project.op,
        opTicketID: '63402',
    }
}

export const behaviorsData = {
    epic: project.name,
    features: `Sprint ${project.currentSprint}`,
    story: features.authenticate
}