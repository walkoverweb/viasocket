export default function getPageData(params) {
    let data = {};
    switch (params?.type) {
        case 'integrations':
            if (params?.page === 'integrations') {
                data = require(`@/data/integrations/index.json`);
            } else {
                data = require(`@/data/integrations${params?.page}.json`);
            }
            return data;
            break;
        default:
            return data;
            break;
    }
    return data;
}
