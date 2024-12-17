export default function getIntegrationsInfo(params) {
    console.log('🚀 ~ getIntegrationsInfo ~ params:', params);
    const result = {
        appone: null,
        apptwo: null,
        category: null,
        page: null,
    };

    const integrationsIndex = params.indexOf('integrations');

    if (integrationsIndex !== -1) {
        const nextParam = params[integrationsIndex + 1];
        const nextNextParam = params[integrationsIndex + 2];

        if (nextParam === 'category') {
            if (nextNextParam) {
                result.category = nextNextParam;
                if (params[integrationsIndex + 3] === 'page' && params[integrationsIndex + 4]) {
                    result.page = params[integrationsIndex + 4];
                }
            }
        } else if (nextParam === 'page') {
            if (nextNextParam) {
                result.page = nextNextParam;
            }
        } else if (nextParam) {
            result.appone = nextParam;
            if (nextNextParam && nextNextParam !== 'category' && nextNextParam !== 'page') {
                result.apptwo = nextNextParam;
            } else if (nextNextParam === 'category' && params[integrationsIndex + 3]) {
                result.category = params[integrationsIndex + 3];
            } else if (nextNextParam === 'page' && params[integrationsIndex + 3]) {
                result.page = params[integrationsIndex + 3];
            }
        }
    }

    return result;
}
