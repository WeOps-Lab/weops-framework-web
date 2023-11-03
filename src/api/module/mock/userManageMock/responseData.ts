import {roles as roleItems} from '../roleManageMock/responseData'
import Mock from 'mockjs'
// 菜单数据
const menuItems = [
    {
        'id': 1,
        'created_at': '2023-08-28 23:37:32',
        'updated_at': '2023-10-30 15:11:10',
        'created_by': 'admin',
        'updated_by': 'admin',
        'menu_name': '默认菜单',
        'default': true,
        'use': true,
        'menu': []
    },
    {
        'id': 2,
        'created_at': '2023-08-29 18:17:34',
        'updated_at': '2023-10-30 15:10:57',
        'created_by': 'admin',
        'updated_by': 'admin',
        'menu_name': '外链',
        'default': false,
        'use': false,
        'menu': [
            {
                'id': 'datainsight7457',
                'key': '050v9',
                'url': 'http://datainsight.weops.com/',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-lian-jie',
                'name': 'datainsight',
                'isUrl': true
            },
            {
                'id': 'SysUser',
                'url': '/sysUser',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    },
                    {
                        'key': 'operateAuth',
                        'type': 'operate',
                        'label': '操作',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-user',
                'name': '用户管理',
                'originName': '系统管理/用户管理'
            },
            {
                'id': 'SysLog',
                'url': '/sysLog',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-operation-log-fill',
                'name': '操作日志',
                'originName': '系统管理/操作日志'
            },
            {
                'id': 'SysRole',
                'url': '/sysRole',
                'auth': [
                    {
                        'key': 'checkAuth',
                        'type': 'check',
                        'label': '查看',
                        'value': false
                    },
                    {
                        'key': 'operateAuth',
                        'type': 'operate',
                        'label': '操作',
                        'value': false
                    }
                ],
                'icon': 'cw-icon weops-role',
                'name': '角色管理',
                'originName': '系统管理/角色管理'
            }
        ]
    }
]

// 人员管理数据
const userItems = [
    {
        'id': 2,
        'bk_username': 'admin',
        'chname': '\u8d85\u7ba1'
    },
    {
        'id': 3,
        'bk_username': 'randy61',
        'chname': 'randy61'
    },
    {
        'id': 7,
        'bk_username': 'pwm',
        'chname': '\u72d7\u86cb'
    },
    {
        'id': 8,
        'bk_username': 'eric',
        'chname': 'Eric'
    },
    {
        'id': 10,
        'bk_username': 'windyzhao',
        'chname': '\u8d75\u91d1\u76df'
    },
    {
        'id': 11,
        'bk_username': 'windyzhao1',
        'chname': '\u8d75\u91d1\u76df\u5c0f\u5f1f'
    }
]

// 用户列表数据
const userListItems = [
    {
        'id': 157,
        'bk_user_id': 138,
        'bk_username': 'test_qjj_009',
        'chname': 'test_qjj_009',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    },
    {
        'id': 156,
        'bk_user_id': 137,
        'bk_username': 'test_qjj_090',
        'chname': 'test_qjj_090',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    },
    {
        'id': 155,
        'bk_user_id': 136,
        'bk_username': 'test_qjj_09',
        'chname': 'test_qjj_09',
        'email': 'asjida@qq.com',
        'phone': '13556789765',
        'roles': [
            3
        ],
        'local': true,
        'departments': [
            {
                'id': 1,
                'name': '总公司',
                'order': 1,
                'full_name': '总公司'
            }
        ],
        'leaders': [],
        'status': 'NORMAL'
    }
]

// 双因子认证配置
let loginSetData = Mock.mock({
    'default_domain': 'default.local',
    'auth_type': ['mail'],
    'auth_white_list': {
        'role|2': [
            {
                'id|+1': 100,
                'role_name': '@word',
                'user_count|0-5': 0,
                'isChecked': true
            }
        ],
        'user': []
    },
    'two_factor_enable': false
})

// 角色列表(白名单)
const roleItemsWhite = Mock.mock({
    'items|3': [
        {
            'id|+1': 110,
            'role_name': '@word',
            'user_count|1-20': 1
        }
    ]
})

export default {
    getMenuData: (params) => {
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: {
                page: 1,
                total_page: 1,
                count: menuItems.length,
                next: null,
                previous: null,
                items: menuItems
            }
        }
        res.data.items = menuItems.filter(item => item.menu_name.includes(params.search))
        return res
    },
    getMenuById: (params) => {
        const menuData = menuItems.find(item => item.id === params.id)
        const res = {
            result: true,
            code: '20000',
            message: 'success',
            data: menuData
        }
        return res
    },
    deleteMenu: (params) => {
        const deleteIndex = menuItems.findIndex(item => item.id === params.id)
        menuItems.splice(deleteIndex, 1)
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: {'success': true}
        }
    },
    useMenu: (params) => {
        menuItems.forEach(item => {
            if (item.id === params.id) {
                item.use = true
            } else {
                item.use = false
            }
        })
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: {success: true}
        }
    },
    searchUserList: (params) => {
        const res = {
            result: true,
            data: {
                count: 0,
                items: userItems
            }
        }
        res.data.count = userItems.length
        res.data.items = userItems.filter(item => item.chname.includes(params.search))
        return res
    },
    setUsersByRole: (params) => {
        const roleItem = roleItems.find(item => item.id === params.id)
        const userList = userItems.filter(item => params.users.includes(item.id))
        roleItem.users = userList.map(item => {
            return {
                bk_user_id: Mock.mock('@id'),
                bk_username: item.bk_username,
                chname: item.chname,
                id: item.id
            }
        })
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '设置成功！'
        }
    },
    getUserList: (params) => {
        const res = {
            'result': true,
            'code': '20000',
            'message': 'success',
            'data': {
                'page': 1,
                'total_page': 1,
                'count': 0,
                'next': 'http://paas.weops.com/o/weops_saas/system/mgmt/user_manage/get_users/?page=2&page_size=20&roles=%5B%5D&search=',
                'previous': null,
                'items': userListItems
            }
        }
        res.data.count = userListItems.length
        res.data.total_page = Math.ceil(res.data.count / params.page_size)
        res.data.items = userListItems.filter(item => item.bk_username.includes(params.search))
        return res
    },
    deleteUser: (params) => {
        const deleteIndex = userListItems.findIndex(item => item.bk_user_id = params.bk_user_id)
        userListItems.splice(deleteIndex, 1)
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '删除用户成功！'
        }
    },
    setUserRoles: (params) => {
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '设置用户角色成功！'
        }
    },
    editUser: (params) => {
        const editItem = userListItems.find(item => item.id === params.id)
        if (editItem) {
            editItem.bk_username = params.display_name
            editItem.email = params.email
            editItem.phone = params.telephone
            editItem.leaders = params.leader
        }
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '修改用户成功'
        }
    },
    createUser: (params) => {
        const newUser = {
            id: Mock.mock('@integer'),
            bk_user_id: Mock.mock('@integer'),
            bk_username: params.username,
            chname: params.display_name,
            email: params.email,
            phone: params.telephone,
            local: true,
            roles: [],
            departments: [
                {
                    id: Mock.mock('@integer'),
                    name: '总公司',
                    order: 1,
                    full_name: '总公司'
                }
            ],
            leaders: [params.leader],
            status: 'NORMAL'
        }
        userListItems.unshift(newUser)
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '创建用户成功'
        }
    },
    updateUserStatus: (params) => {
        const updateUser = userListItems.find(item => item.id === params.id)
        updateUser.status = params.body.status
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '修改用户状态成功'
        }
    },
    resetPassword: (params) => {
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: '重置密码成功'
        }
    },
    getDomainList: (params) => {
        return {
            result: true,
            data: ['default.local', 'test']
        }
    },
    getLoginSet: (params) => {
        return {
            result: true,
            data: loginSetData
        }
    },
    setDomain: (params) => {
        loginSetData.default_domain = params.default_domain
        return {
            result: true
        }
    },
    updateLoginSet: (params) => {
        loginSetData = params
        return {
            result: true
        }
    },
    searchRoleList: (params) => {
        const res = {
            result: true,
            data: {
                count: 0,
                items: roleItemsWhite.items
            }
        }
        res.data.count = roleItemsWhite.items.length
        return res
    },
    createMenuManage: (params) => {
        const newMenu = {
            id: +Mock.mock('@id'),
            created_at: Mock.mock('@now'),
            updated_at: Mock.mock('@now'),
            created_by: 'admin',
            updated_by: 'admin',
            menu_name: params.menu_name,
            default: false,
            use: false,
            menu: params.menu
        }
        menuItems.push(newMenu)
        return {
            result: true,
            code: '20000',
            message: 'success',
            data: newMenu
        }
    }
}
