export let navIds = {
    SP_DATA: '100000',
    SP_DATA_LIST: '100001',
    SP_DATA_ADD_UPDATA: '100002',
    SP_DATA_CODE_LIST: '100003',
    SP_DATA_CODE_ADD_UPDATA: '100004',
    SP_DATA_CODE_RATES_LIST: '100006',
    SP_DATA_CODE_RATES_ADD_UPDATA: '100006',
    SP_DATA_RATES_LIST: '100007',
    SP_DATA_CODE_CONFIG: '100008',
    SP_DATA_CODE_CONFIG_ADD: '100009',
    SP_USERDATA: '200000',
    SP_USERDATA_LIST: '200001',
    SP_USERDATA_ADD: '200002',
    CP: '300000',
    CP_LIST: '300001',
    CP_COUNTLIST: '300002',
    APP_LIST: '300003',
    COUNT_LIST: '300004',
    CHARGE: '900000',
    CP_CMD_FEE_LIMIT_LIST: '400000',
    CP_CHECK_REDUCE_LIST: '500000',
    BLACKLIST:'600000',
    USER: '110000',
    USER_LIST: '110001',
    USER_ADD: '110002',
    HELP: '700000'
};

export let navDatas = [{
    id: navIds.SP_DATA,
    text: 'SP管理',
    href: '/SP',
    children: [{
        id: navIds.SP_DATA_LIST,
        text: 'SP信息',
        href: '/SP/SpListPage'
    }, {
        id: navIds.SP_DATA_CODE_LIST,
        text: '代码信息',
        href: '/SP/DmListPage'
    }, {
        id: navIds.SP_DATA_RATES_LIST,
        text: '代码资费信息',
        href: '/SP/DzListPage'
    }]
}, {
    id: navIds.SP_USERDATA,
    text: 'SP单用户配置',
    href: '/spUser'
}, {
    id: navIds.CP,
    text: 'CP管理',
    href:'/cp',
    children: [
        {
            id: navIds.CP_LIST,
            text: 'CP信息',
            href: '/cp/list'
        }, {
            id: navIds.APP_LIST,
            text: 'App信息',
            href: '/app'
        }, {
            id: navIds.COUNT_LIST,
            text: '计费点信息',
            href: '/count'
        }
    ]
}, {
    id: navIds.CHARGE,
    text: 'CP代码资费配置',
    href:'/charge'
}, {
    id: navIds.CP_CMD_FEE_LIMIT_LIST,
    text: 'CP放量配置',
    href: '/cpcmdfeelimit'
}, {
    id: navIds.CP_CHECK_REDUCE_LIST,
    text: 'CP核减配置',
    href: '/cpreduceper'
},{
    id: navIds.BLACKLIST,
    text: '号码屏蔽',
    href: '/blacklist'
}];

export let navDatasAdmin = [{
    id: navIds.SP_DATA,
    text: 'SP管理',
    href: '/SP',
    children: [{
        id: navIds.SP_DATA_LIST,
        text: 'SP信息',
        href: '/SP/SpListPage'
    }, {
        id: navIds.SP_DATA_CODE_LIST,
        text: '代码信息',
        href: '/SP/DmListPage'
    }, {
        id: navIds.SP_DATA_RATES_LIST,
        text: '代码资费信息',
        href: '/SP/DzListPage'
    }]
}, {
    id: navIds.SP_USERDATA,
    text: 'SP单用户配置',
    href: '/spUser'
}, {
    id: navIds.CP,
    text: 'CP管理',
    href:'/cp',
    children: [
        {
            id: navIds.CP_LIST,
            text: 'CP信息',
            href: '/cp/list'
        }, {
            id: navIds.APP_LIST,
            text: 'App信息',
            href: '/app'
        }, {
            id: navIds.COUNT_LIST,
            text: '计费点信息',
            href: '/count'
        }
    ]
}, {
    id: navIds.CHARGE,
    text: 'CP代码资费配置',
    href:'/charge'
}, {
    id: navIds.CP_CMD_FEE_LIMIT_LIST,
    text: 'CP放量配置',
    href: '/cpcmdfeelimit'
}, {
    id: navIds.CP_CHECK_REDUCE_LIST,
    text: 'CP核减配置',
    href: '/cpreduceper'
},{
    id: navIds.BLACKLIST,
    text: '号码屏蔽',
    href: '/blacklist'
}, {
    id: navIds.USER,
    text: '系统设置',
    children: [{
        id: navIds.USER_LIST,
        text: '用户管理',
        href: '/user'
    }],

}];


export let navDatasCp = [{
      id: navIds.CP,
      text: 'CP管理',
      href:'/cp',
      children: [
          {
              id: navIds.CP_LIST,
              text: 'CP信息',
              href: '/cp/list'
          }
      ]},{
    id: navIds.HELP,
    text: '帮助',
    href:'/help'
}]

export let navDatasSdk = [{
      id: navIds.CP,
      text: 'CP管理',
      href:'/cp',
      children: [
          {
              id: navIds.CP_LIST,
              text: 'CP信息',
              href: '/cp/list'
          }, {
              id: navIds.APP_LIST,
              text: 'App信息',
              href: '/app'
          }, {
              id: navIds.COUNT_LIST,
              text: '计费点信息',
              href: '/count'
          }
      ]},{
      id: navIds.HELP,
      text: '帮助',
      href:'/help'
}]

export let navDatasApi = [{
      id: navIds.CP,
      text: 'CP管理',
      href:'/',
      children: [
          {
              id: navIds.CP_LIST,
              text: 'CP信息',
              href: '/cp/list'
          }, {
              id: navIds.APP_LIST,
              text: 'App信息',
              href: '/app'
          }
      ]},{
    id: navIds.HELP,
    text: '帮助',
    href:'/help'
}]

export function getNavData(loginType, roleId, roleType) {
    let realNav;
    if(loginType === "1") {
        if(roleId === "2") {
            realNav = navDatasAdmin;
        } else {
            realNav = navDatas;
        }
    } else {
        switch (roleType) {
            case "1":
                realNav = navDatasApi;
                break;
            case "2":
                realNav = navDatasSdk;
                break;
            default:
                realNav = navDatasCp;
        }
    }
    return realNav;
}
