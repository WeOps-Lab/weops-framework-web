import Mock from 'mockjs'

const infoData = {
    'weops_menu': [],
    'username': 'admin',
    'applications': [
        'resource',
        'big_screen',
        'health_advisor',
        'operational_tools',
        'repository',
        'senior_resource',
        'itsm',
        'patch_mgmt',
        'auto_process',
        'chat_ops',
        'dashboard',
        'custom_topology',
        'dashboard_senior',
        'timed_job',
        'apm',
        'syslog',
        'monitor_mgmt'
    ],
    'is_super': true,
    'menus': [],
    'chname': '\u8d85\u7ba1',
    'operate_ids': [],
    'role': [
        4
    ],
    'last_login_addr': '',
    'last_login': Mock.mock('@now'),
    'bk_token': 'b05osMnGzELxZMGyyRLIqEB_0wwN0Js-jLKIX6ND-bA',
    'version': '4.69999',
    'expired_day': 303,
    'notify_day': 30
}

export default {
    homeInfo: () => {
        const res = {
            result: true,
            data: infoData
        }
        return res
    }
}
