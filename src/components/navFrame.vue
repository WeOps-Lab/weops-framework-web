<template>
    <bk-navigation
        :header-title="nav.id"
        :side-title="nav.title"
        :hover-width="190"
        :default-open="defaultOpen"
        navigation-type="top-bottom"
        :need-menu="needLeftNav"
        :head-height="headerHight"
        :class="{ 'navigation-other-wrapper': user.expired_day <= user.notify_day }"
        @toggle="handleToggle">
        <template slot="side-icon">
            <div class="monitor-logo" @click="goHome">
                <img :src="'data:image/png;base64,' + nav.logo" height="40" width="40" :alt="'logo图片'">
                <div class="credit-tip" v-if="user.expired_day <= user.notify_day">
                    <bk-popconfirm
                        :content="`WeOps许可将于${user.expired_day > 0 ? user.expired_day + '天后' : '今天'}到期，为保障正常运行，请联系您的专属客户经理及时续期。`"
                        width="280"
                        ext-cls="pop-custom">
                        <bk-button size="small" theme="danger" @click.stop="linkToCredit">
                            即将到期
                        </bk-button>
                    </bk-popconfirm>
                </div>
            </div>
        </template>
        <template slot="header">
            <div class="monitor-navigation-header">
                <ul class="top-nav">
                    <li
                        v-for="item in menuList"
                        :key="item.id"
                        :class="['top-nav-item', activeTopNav === item.id && 'active-top-nav']"
                        @click="changeTopNav(item)">
                        {{item.name}}
                    </li>
                </ul>
                <div class="other-info">
                    <bk-popover theme="light navigation-message" :arrow="false" offset="-20, 10" placement="bottom-start"
                        :tippy-options="{ 'hideOnClick': false }" ref="userPopover">
                        <div class="header-user is-left">
                            <span class="show-name hide-text" v-bk-overflow-tips>{{ user.chname }}</span>
                            <i class="bk-icon icon-down-shape"></i>
                        </div>
                        <template slot="content">
                            <ul class="monitor-navigation-admin" ref="userList" @mouseleave="hidePopover">
                                <li class="nav-item" @click="bindWeChat" v-if="!bindStatus">
                                    绑定微信
                                </li>
                                <li v-else class="nav-item" @click="unbindWeChat">
                                    解绑微信
                                </li>
                                <li class="nav-item" @click="checkPersonalInfo">
                                    个人信息
                                </li>
                                <li class="nav-item" @click="outLogin">
                                    退出登录
                                </li>
                            </ul>
                        </template>
                    </bk-popover>
                    <span class="version" @click="checkVersionLog">
                        v{{ version }}
                        <span class="cw-icon weops-directions-fill version-tips"></span>
                    </span>
                    <bk-badge
                        v-if="ticketIconVisible"
                        style="width: 25px;height: 25px;"
                        class="mr20"
                        theme="success"
                        :val="ticketCount"
                        :max="99">
                        <img class="ticket" src="@/assets/svg/ticket.svg" alt="ticket" @click="goTicket" />
                    </bk-badge>
                </div>
            </div>
        </template>
        <template slot="menu">
            <bk-navigation-menu
                ref="menu"
                :before-nav-change="beforeNavChange"
                :default-active="defaultActive"
                :toggle-active="nav.toggle"
                style="cursor: default;"
                :key="refreshNavKey"
                item-hover-color="#3A84FF"
                @select="handleSelect">
                <bk-navigation-menu-item
                    v-for="item in leftNavList"
                    :key="item.name"
                    :has-child="item.children && !!item.children.length"
                    :url="item.url"
                    :id="item.id"
                    @click="handleNavItemClick(item)">
                    <span><i :class="[item.icon || 'cw-icon weops-folder', 'icon-class']"></i>{{ item.name }}</span>
                    <div slot="child">
                        <bk-navigation-menu-item
                            class="child-menu-item"
                            v-for="child in item.children"
                            :key="child.name"
                            :id="child.id"
                            :url="child.url"
                            style="cursor: pointer;"
                            @click="handleNavItemClick(child)">
                            <span>{{ child.name }}</span>
                        </bk-navigation-menu-item>
                    </div>
                </bk-navigation-menu-item>
            </bk-navigation-menu>
        </template>
        <Container :key="renderKey" :nav-toggle="nav.toggle" :user="user"></Container>
        <bk-dialog
            v-model="isShow"
            theme="primary"
            :mask-close="false"
            :show-footer="false"
            style="text-align: center;">
            <img :src="qrode" alt="这是一个二维码" width="200" height="200">
        </bk-dialog>
        <personal-info ref="personalInfo"></personal-info>
        <version-log ref="versionLog"></version-log>
    </bk-navigation>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import Container from './container.vue'
    import PersonalInfo from './personalInfo.vue'
    import VersionLog from './versionLog.vue'
    import { mapState } from 'vuex'
    import { removeItemsWithId } from '@/common/dealMenu'
    @Component({
        components: {
            Container,
            PersonalInfo,
            VersionLog
        },
        computed: {
            ...mapState({
                permission: item => item.permission
            })
        }
    })
    export default class NavFrame extends Vue {
        defaultOpen: boolean = false
        renderKey: number = 0
        clickFlag: boolean = false
        activeTopNav: string = ''
        bindStatus: boolean = false
        leftNavList: Array<any> = []
        isShow: boolean = false
        qrode: string = ''
        timeoutId: any = ''
        title: string = this.$route.meta.title
        nav = {
            list: [],
            name: '',
            id: 'HomeFirst',
            toggle: false,
            submenuActive: false,
            title: 'WeOps',
            // 图片base64格式
            logo: ''
        }
        defaultActive: string = ''
        refreshNavKey: string = 'leftNavkey'
        ticketIconVisible = false
        get user() {
            const user = this.permission.user
            if (user.is_super) {
                this.ticketIconVisible = true
            } else {
                this.ticketIconVisible = user.menus?.includes('Ticket') && user.applications.includes('itsm')
            }
            return user
        }
        get version() {
            const _version = this.user.version
            if (_version && _version.includes('00')) {
                return _version.replace(/00/, '-rc')
            }
            if (_version && _version.includes('99')) {
                return _version.replace(/.99/, '-ga')
            }
            return _version
        }
        get menuList() {
            return this.permission.menuList
        }
        get ticketCount() {
            return this.permission.ticketCount
        }
        get updateCustomMenu() {
            return this.permission?.updateCustomMenu
        }
        get needLeftNav() {
            const target = this.menuList.find(item => item.id === this.activeTopNav)
            return !!(target && target.children)
        }
        get headerHight() {
            return this.$route.name === 'RemoteConnect' ? '0' : '52'
        }
        @Watch('$route', {
            immediate: true,
            deep: true
        })
        @Watch('updateCustomMenu', {
            deep: true
        })
        on$routeChanged(val) {
            let routeValue = val
            // 若watch的变量updateCustomMenu，则为布尔值，即该菜单改变时处理如下
            if (typeof val === 'boolean') {
                routeValue = this.$route
            }
            if (this.clickFlag) {
                this.clickFlag = false
                this.renderKey++
            }
            this.menuList.forEach(item => {
                if (item.id === routeValue.name || (item.sonMenuIds || []).includes(routeValue.name)) {
                    this.activeTopNav = item.id
                    if ((item.sonMenuIds || []).includes(routeValue.name)) {
                        this.leftNavList = item.children
                    }
                } else {
                    if (!routeValue.meta?.parentIds) {
                        return false
                    }
                    const morePage = item.sonMenuIds.map(tex => routeValue.meta.parentIds.find(nev => nev === tex))
                    if (!morePage.every(tex => !tex)) {
                        this.activeTopNav = item.id
                        this.leftNavList = item.children
                    }
                }
            })
            this.defaultActive = this.setDefaultActive()
        }
        @Watch('leftNavList', {
            immediate: true,
            deep: true
        })
        onLeftNavListChanged(val) {
            // 判断用户不是超管组内的人员，则不展示系统管理的界面[角色管理，用户管理，通知渠道，服务台管理]
            if (!this.user.is_super) {
                const ONLY_ADMIN_HAS_MENUS = ['ServiceDeskManage', 'AutoProcessManage', 'SysRole', 'SysUser', 'NoticeWays']
                removeItemsWithId(val, ONLY_ADMIN_HAS_MENUS)
            }
        }
        created() {
            if (document.body.clientWidth > 1440) {
                this.defaultOpen = true
            }
        }
        mounted() {
            this.$bus.$on('updateLogo', () => {
                this.getLogo()
            })
            this.$bus.$on('refreshNav', from => {
                this.defaultActive = this.setDefaultActive()
                this.refreshNavKey = Vue.prototype.$random(5)
                const topNav = this.menuList.find(item => item.sonMenuIds.includes(from.name) || item.sonMenuIds.includes(from.meta.activeMenu))
                if (topNav) {
                    this.activeTopNav = topNav.id
                    this.leftNavList = topNav.children
                }
            })
            this.getLogo()
            this.title = this.$route.meta.title
            this.getBindStatus()
        }
        beforeDestroy() {
            this.$bus.$off('updateLogo')
        }
        checkVersionLog() {
            const versionLog: any = this.$refs.versionLog
            versionLog.show()
        }
        checkPersonalInfo() {
            const personalInfo: any = this.$refs.personalInfo
            personalInfo.show()
        }
        goTicket() {
            this.$router.push({
                name: 'Ticket'
            })
        }
        setDefaultActive() {
            if (this.$route.meta.hasOwnProperty('parentIds')) {
                if (this.$route.meta.activeMenu) {
                    return this.$route.meta.activeMenu
                } else {
                    const activeMenuId = sessionStorage.getItem('activeMenuId')
                    if (activeMenuId) {
                        return JSON.parse(activeMenuId)
                    }
                }
            }
            return this.$route.name
        }
        hidePopover() {
            const userPopover:any = this.$refs['userPopover']
            userPopover.hideHandler()
        }
        async unbindWeChat() {
            const url = `${window.location.origin}/console/user_center/weixin/unbind_wx_user_info/`
            await this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    this.bindStatus = false
                    this.$success('解绑成功')
                    this.$api.Server.syncUsers()
                }
            })
        }
        outLogin() {
            sessionStorage.clear()
            window.location.href = `${window.location.origin}/accounts/logout/`
        }
        async getBindStatus() {
            const url = `${window.location.origin}/console/user_center/weixin/get_bind_status/`
            await this.$http.get(url).then(response => {
                const res = response?.data
                this.bindStatus = res.result
            })
        }
        async bindWeChat() {
            let url = ''
            if (window['CONSOLE_BIND_WX_TYPE'] === 'qywx') {
                url = `${window.location.origin}/console/user_center/weixin/qy/get_login_url/`
            } else {
                url = `${window.location.origin}/console/user_center/weixin/mp/get_qrcode`
            }
            await this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    if (window['CONSOLE_BIND_WX_TYPE'] === 'qywx') {
                        window.open(res.url)
                    } else {
                        this.isShow = true
                        this.qrode = res.url
                        this.getNowStatus()
                    }
                } else {
                    this.$error('获取二维码接口异常，请联系管理员')
                }
            })
        }
        getNowStatus() {
            const url = `${window.location.origin}/console/user_center/weixin/get_bind_status/`
            this.$http.get(url).then(response => {
                const res = response?.data
                if (res.result) {
                    this.bindStatus = true
                    this.isShow = false
                    clearTimeout(this.timeoutId)
                    this.$api.Server.syncUsers()
                } else {
                    this.timeoutId = setTimeout(() => {
                        this.getNowStatus()
                    }, 1000)
                }
            })
        }
        handleSelect(id, item) {
            this.nav.id = id
        }
        getLogo() {
            this.$api.Server.getLogo({}, {
                cancelWhenRouteChange: false
            }).then(res => {
                if (res.result) {
                    this.nav.logo = res.data.value
                }
            })
        }
        changeTopNav(item) {
            if (item.isUrl) {
                window.open(item.url, '_blank')
            } else {
                this.activeTopNav = item.id
                if (!item.children) {
                    this.clickFlag = true
                    this.$router.push({
                        name: this.activeTopNav
                    })
                    return false
                }
                this.leftNavList = item.children
                if (this.leftNavList.every(item => item.isUrl)) {
                    return false
                }
                this.$router.push({
                    name: this.findFirstNonUrlId(this.leftNavList)
                })
            }
        }
        findFirstNonUrlId(arr) {
            for (const item of arr) {
                if (item.isUrl) {
                    continue
                }
                if (item.children && item.children.length > 0) {
                    const childResult = this.findFirstNonUrlId(item.children)
                    if (childResult !== null) {
                        return childResult
                    }
                } else {
                    return item.id
                }
            }
            return null
        }
        goHome() {
            this.$router.push('/')
            this.nav.name = this.$route.meta.title
        }
        handleToggle(v) {
            this.nav.toggle = v
        }
        beforeNavChange(item) {
            const result = this.findItemById(this.leftNavList, item)
            return !result.isUrl
        }
        findItemById(arr, id) {
            for (const item of arr) {
                if (item.id === id) {
                    return item
                }
                if (item.children) {
                    const found = this.findItemById(item.children, id)
                    if (found) {
                        return found
                    }
                }
            }
            return null
        }
        handleNavItemClick(item) {
            if (item.isUrl) {
                window.open(item.url, '_blank')
            } else {
                this.clickFlag = true
                if (this.$route.name !== item.id) {
                    this.nav.name = item.name
                    sessionStorage.setItem('activeMenuId', JSON.stringify(item.id))
                    this.$router.push({
                        name: item.id,
                        params: item.params || {}
                    })
                }
            }
        }
        linkToCredit() {
            if (!this.user.is_super) {
                return
            }
            this.$router.push({
                name: 'CreditManage'
            })
        }
    }
</script>

<style lang="scss">
    .child-menu-item .navigation-menu-item-name {
        overflow: auto !important;
        white-space: normal !important;
    }
    .bk-navigation {
        width: 100% !important;
    }
    .monitor-logo {
        display: flex;
        align-items: center;
        .credit-tip {
            position: absolute;
            top: 5px;
            left: 140px;
        }
    }
    .bk-navigation-wrapper .navigation-container {
        width: 100% !important;
        max-width: 100% !important;
    }
    .icon-class {
        font-size: 16px;
        min-width: 38px;
        text-align: left;
        display: inline-block;
    }
    .bk-navigation-title {
        flex: 0 0 200px !important;
    }
    .monitor-navigation-header {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .top-nav {
            display: flex;
            height: 100%;
            max-width: calc(100vw - 470px);
            overflow-x: auto;
            .top-nav-item {
                list-style: none;
                margin-right: 65px;
                display: flex;
                align-items: center;
                color: #96a2b9;
                font-size: 14px;
                white-space: nowrap;
                &:hover {
                    cursor: pointer;
                    color: #d3d9e4;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
            .active-top-nav {
                color: #fff;
            }
        }
        .other-info {
            display: flex;
            height: 100%;
            align-items: center;
            flex: 1;
            flex-direction: row-reverse;
            .show-name {
                display: inline-block;
                max-width: 100px;
            }
            .ticket {
                width: 25px;
                height: 25px;
                cursor: pointer;
            }
            .cw-icon-gongdan-xian {
                font-size: 30px;
                color: #fff;
                cursor: pointer;
            }
            .bk-badge-wrapper .bk-badge.bk-success {
                border: none;
            }
            .version {
                font-size: 12px;
                margin-right: 20px;
                position: relative;
                cursor: pointer;
                &:hover {
                    color: #fff;
                }
                .version-tips {
                    position: absolute;
                    font-size: 13px;
                    right: -13px;
                    top: -4px;
                }
            }
        }
    }
    .monitor-navigation-header {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: 14px;
        //justify-content: flex-end;
    }

    .monitor-navigation-header .header-title {
        color: #63656E;
        font-size: 16px;
        display: flex;
        flex: 1;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-left: -6px;
        .header-title-tip {
            color: #979BA5;
            font-size: 12px;
            margin-left: 8px;
            margin-top: 1px;
        }
    }

    .monitor-navigation-header .header-mind {
        font-size: 14px;
        position: relative;
        height: 32px;
        line-height: 32px;
        min-width: 140px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #63656e;

        .iconfont {
            font-size: 14px;
            margin: 0 4px;
        }
    }

    .monitor-navigation-header .header-mind.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-mind.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-mind-mark {
        position: absolute;
        right: 8px;
        top: 8px;
        height: 7px;
        width: 7px;
        border: 1px solid #27334C;
        background-color: #EA3636;
        border-radius: 100%;
    }

    .monitor-navigation-header .header-mind-mark.is-left {
        border-color: #F0F1F5;
    }

    .monitor-navigation-header .header-mind:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-header .header-help {
        font-size: 14px;
        position: relative;
        height: 32px;
        min-width: 140px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #63656e;
        line-height: 32px;

        .iconfont {
            font-size: 16px;
            margin: 0 4px;
        }
    }

    .monitor-navigation-header .header-help.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-help.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-help:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-header .header-user {
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        color: #96A2B9;
        margin-left: 8px;
    }

    .monitor-navigation-header .header-user .bk-icon {
        margin-left: 5px;
        font-size: 12px;
    }

    .monitor-navigation-header .header-user.is-left {
        color: #63656E;
    }

    .monitor-navigation-header .header-user.is-left:hover {
        color: #3A84FF;
    }

    .monitor-navigation-header .header-user:hover {
        cursor: pointer;
        color: #D3D9E4;
    }

    .monitor-navigation-admin {
        width: 100px;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        border-radius: 4px;
        background: #FFFFFF;
        border: 1px solid #E2E2E2;
        -webkit-box-shadow: 0 3px 4px 0 rgba(64, 112, 203, 0.06);
        box-shadow: 0 3px 4px 0 rgba(64, 112, 203, 0.06);
        padding: 6px 0;
        margin: 0;
        color: #63656E;
    }

    .monitor-navigation-admin .nav-item {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 32px;
        flex: 0 0 32px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 20px;
        list-style: none;
    }

    .monitor-navigation-admin .nav-item:hover {
        color: #3A84FF;
        cursor: pointer;
        background-color: #F0F1F5;
    }

    .tippy-popper .tippy-tooltip.navigation-message-theme {
        padding: 0;
        border-radius: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

    .bk-icon {
        &.icon-arrows-left {
            font-size: 30px;
            margin-right: 10px;
            color: #3A84FF;
            cursor: pointer;
        }
    }
    .navigation-sbmenu,
    .navigation-menu-item {
        .cw-icon {
            text-align: left !important;
        }
    }
    // 适配到期情况的宽度
    .navigation-other-wrapper {
        .bk-navigation-title {
            flex: 0 0 260px !important;
        }
        .monitor-navigation-header {
            .top-nav {
                max-width: calc(100vw - 530px);
            }
        }
    }
    /* 当屏幕宽度小于或等于 1280 像素时 */
    @media screen and (max-width: 1280px) {
        .monitor-navigation-header {
            .top-nav {
                max-width: 810px !important;
            }
        }
        .navigation-other-wrapper {
            .monitor-navigation-header {
                .top-nav {
                    max-width: 750px !important;
                }
            }
        }
    }
</style>
