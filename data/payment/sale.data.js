import { severity, features, project, testCase} from "../constants.js"

export const metadata = {
    AP_001: {
        testID: 'AP_001',
        description: testCase.description.sale.AP_001,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
    AP_002: {
        testID: 'AP_002',
        description: testCase.description.sale.AP_002,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
    AP_003: {
        testID: 'AP_003',
        description: testCase.description.sale.AP_003,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
    AP_004: {
        testID: 'AP_004',
        description: testCase.description.sale.AP_004,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
    AP_005: {
        testID: 'AP_005',
        description: testCase.description.sale.AP_005,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
    AP_006: {
        testID: 'AP_006',
        description: testCase.description.sale.AP_006,
        owner: project.owner,
        tags: [`Sprint ${project.currentSprint}`,project.name, features.sale],
        severity: severity.normal,
        opProject: project.op,
        opTicketID: '61624',
    },
}

export const behaviorsData = {
    epic: project.name,
    features: `Sprint ${project.currentSprint}`,
    story: features.sale
}