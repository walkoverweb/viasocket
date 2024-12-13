export default async function getAppDetails(app) {
    const response = await fetch(`https://plugservice-api.viasocket.com/plugins/search?key=${app}`);
    const data = await response.json();
    const dataa = {
        rowid: 'rowbu58rc',
        autonumber: 107,
        createdat: '2023-09-30T13:48:29.698Z',
        createdby: 'keygChvX_mbEv5m',
        updatedat: '1733923353',
        updatedby: 'developer_hub(PROD_BASE)',
        name: 'Slack',
        description: 'Slack is a team Communication Platform. Focused on chat, apps and working with bots.',
        domain: 'slack.com',
        audience: 'Public',
        orgid: '4160',
        publishdescription: 'ajfirst01',
        istriggeravailable: true,
        customactionconfigs: null,
        iconurl: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg',
        appslugname: 'slack',
        status: 'published',
        category: [
            'communication and collaboration tools.',
            'Communication',
            'Contact Management',
            'Content & Files',
            'Notifications',
        ],
        brandcolor: '#611f69',
        created_by: null,
        updated_by: '9457_veeru.office1@gmail.com',
        tags: ['Remote Work', 'File Sharing', 'Direct Messages', 'Collaboration Tools', 'Notifications', 'Channels'],
        whitelistdomains: ['slack.com'],
        isdummy: null,
        preferedauthversion: 'row8eu6jw8bb',
        actioncount: '7',
        triggercount: '0',
        verified: true,
        preferedauthtype: 'Auth2.0',
    };
    return dataa;
}
