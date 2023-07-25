// 无设置菜单权限
const AuthPermission = () => import('@/views/authPermission.vue')
const Forbidden = () => import('@/views/403.vue')
const NoFound = () => import('@/views/404.vue')
let mainRouter = [
    {
        path: '/authPermissionFail',
        name: 'AuthPermissionFail',
        component: AuthPermission,
        meta: {
            title: '无菜单权限'
        }
    },
    {
        path: '/403',
        name: '403',
        component: Forbidden,
        meta: {
            title: '页面无访问权限'
        }
    },
    {
        path: '/404',
        name: '404',
        component: NoFound,
        meta: {
            title: '页面找不到'
        }
    }
]
const routeConfig = []
let subsMenuPromission = {}
const manageMenu = []
// 自动导入子应用
// @ts-ignore
const files = require.context('@/projects', true, /frameRouter.ts/)
files.keys().forEach(key => {
    const router = files(key).frameRouter
    const menuList = files(key).adminRouteConfig
    const subsMenu = files(key).subsMenuList
    mainRouter = mainRouter.concat(router)
    // 处理合并项目菜单
    menuList.forEach(item => {
        const targetIndex = routeConfig.findIndex(tex => tex.id === item.id)
        if (targetIndex !== -1) {
            routeConfig[targetIndex].children = routeConfig[targetIndex].children.concat(item.children).sort((a, b) => a.sortIndex - b.sortIndex)
        } else {
            routeConfig.push(item)
        }
    })
    routeConfig.sort((a, b) => a.sortIndex - b.sortIndex)
    subsMenuPromission = { ...subsMenuPromission, ...subsMenu }
    const manageMenuItem = files(key).manageMenu
    if (manageMenuItem) {
        manageMenuItem.forEach(item => {
            const findIndex = manageMenu.findIndex(tex => tex.id === item.id)
            if (findIndex !== -1) {
                manageMenu[findIndex].children = manageMenu[findIndex].children.concat(item.children).sort((a, b) => a.sortIndex - b.sortIndex)
            } else {
                manageMenu.push(item)
            }
        })
    }
})

routeConfig.forEach(item => {
    if (item.id === 'Setting') {
        item.children = item.children.concat(manageMenu).sort((a, b) => a.sortIndex - b.sortIndex)
    }
})

export const frameRouter = mainRouter

export const menuList = routeConfig

export const subsMenuList = subsMenuPromission
