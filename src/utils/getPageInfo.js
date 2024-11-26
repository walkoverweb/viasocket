export default function getPageInfo(params) {
    let pageInfo = {
        type: 'integrations',
        page: 'integrations',
        pagination: {
            pageNo: 1,
        },
        pageURL:
            '/integrations/' +
            (params?.slug?.includes('page') ? params?.slug?.slice(0, -2).join('/') : params?.slug?.join('/')),
        query: params || {},
    };

    switch (params?.slug?.length) {
        case 1:
            pageInfo.type = 'appone';
            pageInfo.page = params.slug[0];
            break;
        case 2:
            if (params.slug[0] === 'page') {
                pageInfo.pagination.pageNo = Number(params.slug[1]);
            } else {
                pageInfo.type = 'apptwo';
                pageInfo.page = params.slug[1];
            }
            break;
        case 3:
            pageInfo.type = 'appone';
            pageInfo.page = params.slug[0];
            pageInfo.pagination.pageNo = Number(params.slug[2]);
            break;
        default:
            pageInfo.page = 'integrations';
            pageInfo.pageURL = '/integrations';
            break;
    }
    return pageInfo;
}
