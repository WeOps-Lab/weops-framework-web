import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import { frameRouter, subsMenuList } from './frameRouter'
import httpConfig from '@/api/axiosconfig/request'

// 遇到路由重读点击报错时，取消注释解决
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// 遍历 projects 目录下的所有文件和子目录
// @ts-ignore
const files = require.context('@/projects', true, /\.\/[^/]+\/.*/)

// 判断是否包含了 common 文件夹
const hasCommonFolder = (fileName) => {
    return files.keys().some(key => key.indexOf(`/${fileName}/`) !== -1)
}

Vue.use(Router)

// 路由切换时取消请求
const cancelRequest = async() => {
    const allRequest = httpConfig.queue.get()
    const requestQueue = allRequest.filter(request => request.cancelWhenRouteChange)
    await httpConfig.cancel(requestQueue.map(request => request.requestId))
}

// frameRouter ：参数；框架路由；不需要的话就直接注释

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
// @ts-ignore
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
// @ts-ignore
Router.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

const router = new Router({
    routes: frameRouter // 替换到这里
})
const dealRouterByPermission = async(to, from, next) => {
    const permission = store.state.permission
    if (!permission.user || JSON.stringify(permission.user) === '{}') {
        await store.dispatch('GenerateNavLists1')
    }
    const allUserData = sessionStorage.getItem('allUserData')
    if (!(allUserData && JSON.stringify(allUserData).length)) {
        await store.dispatch('getAllUserList')
    }
    const userInfo = permission.user
    const menuList = permission.menuList
    const allowJumpList = []
    menuList.forEach(item => {
        if (item.children) {
            item.children.forEach(tex => {
                allowJumpList.push(tex)
            })
        } else {
            allowJumpList.push(item)
        }
    })
    if (!window['is_activate'] && to.name !== 'CreditManage') {
        if (to.name === 'ActivationPage') {
            next()
        } else {
            next({name: 'CreditManage'})
        }
    }
    if (!userInfo.is_super && to.name === 'ServiceDeskManage') {
        next({path: from.path})
    }
    if (to.name === 'RemoteConnect') {
        next()
        return
    }
    if (to.name === 'AuthPermissionFail' && menuList.length === 0) {
        next()
    } else {
        const menus = userInfo.menus || []
        if (userInfo.is_super) {
            if (to.name.indexOf('-') !== -1) {
                next({
                    name: to.name.split('-')[1],
                    query: {
                        ...to.query
                    }
                })
            } else {
                next()
            }
        } else {
            const defaultMenu = ['Home', 'SysRole', 'SysUser', 'NoticeWays', 'SelfCureProcess', 'CreditManage', 'SysLog', 'SysLogo']
            const isRead = (userInfo.applications || ['Home']).some(item => {
                const menus = (subsMenuList[item] || []).concat(defaultMenu)
                return menus.includes(to.name) || (to?.meta?.parentIds || []).filter(r => menus.includes(r)).length || menus.includes(to?.meta?.relatedMenu)
            })
            if (menus.includes(to.name)) {
                isRead ? next() : next({ path: from.path })
            } else {
                if (to.fullPath === '/') {
                    if (menus.includes('Home')) {
                        next()
                    } else {
                        // next()
                        if (menuList.length === 0) {
                            next({name: 'AuthPermissionFail'})
                        } else {
                            debugger
                            allowJumpList[0].children ? next({name: allowJumpList[0].children[0].id}) : next({name: allowJumpList[0].id})
                        }
                    }
                } else {
                    const parentIds = to.meta.parentIds || []
                    if (to.name === 'InstanceDetails') {
                        const dynamicMenus = store.state.menu.dynamicMenus
                        for (const k in dynamicMenus.classification) {
                            parentIds.push(k)
                        }
                    }
                    const flag = menus.every(item => !parentIds.includes(item))
                    if (flag) {
                        if (from.name === 'Home') {
                            Vue.prototype.$bus.$emit('setBkTabShow', true)
                        }
                        next({ path: from.path })
                    } else {
                        isRead ? next() : next({ path: from.path })
                    }
                }
            }
        }
    }
}

router.beforeEach(async(to, from, next) => {
    await cancelRequest()
    const permission = store.state.permission
    const menu = store.state.menu
    const completeDynamicRoute = permission.completeDynamicRoute
    const completeLoadChildApp = menu.completeLoadChildApp
    // 处理其他菜单 如:资产的动态和基础监控的动态菜单时,需要走以下的公共逻辑
    if (!completeDynamicRoute && hasCommonFolder('common')) {
        // @ts-ignore
        const commonFiles = require.context('@/projects', true, /\.ts$/)
        const module = commonFiles('./common/router/dealRoute.ts')
        if (module?.default) {
            await module.default.dealRouterByMenu(to, from, next, router)
        } else {
            await dealRouterByPermission(to, from, next)
        }
    } else if (!completeLoadChildApp && hasCommonFolder('common')) {
        // 处理加载外部资源子应用
        // @ts-ignore
        const commonFiles = require.context('@/projects', true, /\.ts$/)
        const module = commonFiles('./common/router/dealRoute.ts')
        if (module?.default) {
            await module.default.dealRouterByChildApp(to, from, next, router)
        } else {
            await dealRouterByPermission(to, from, next)
        }
    } else {
        await dealRouterByPermission(to, from, next)
    }
})

export default router
