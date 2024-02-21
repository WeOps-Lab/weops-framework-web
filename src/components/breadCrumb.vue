<template>
    <div
        class="breadcrumb-container"
        v-if="menuList.length > 1">
        <i
            class="bk-icon icon-arrows-left icon-default"
            @click="toPrev">
        </i>
        <ul>
            <li
                v-for="item in parentMenus"
                :key="item.id"
                v-if="parentMenus.length && menuList.length">
                {{ item.name }}
                <bk-icon type="angle-right" />
            </li>
            <li
                :key="index"
                v-for="(item,index) in menuList">
                <span
                    :class="[menuList.length - 1 > index && 'breadcrumb-active']"
                    @click="toLink(item)">
                    {{ getTitle(item) }}
                </span>
                <bk-icon
                    type="angle-right"
                    v-if="menuList.length - 1 > index" />
            </li>
        </ul>
        <span
            class="sub-title"
            v-if="subTitle">
            -- {{ subTitle }}
        </span>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { frameRouter, menuList } from '@/router/frameRouter'
    @Component({
        name: 'bread-crumb'
    })
    export default class BreadCrumb extends Vue {
        menuList: any[] = []
        parentMenus: any[] = []
        nextRoute: string = ''
        get subTitle() {
            return this.$route.query?.subTitle || this.$route.query?.ip
        }
        get dynamicRoutes() {
            return this.$store.state.menu.dynamicRoutes
        }
        @Watch('$route', {
            immediate: true,
            deep: true
        })
        on$routeChange() {
            this.getBreadcrumb()
        }
        getBreadcrumb() {
            const meta = this.$route.meta
            if (!meta?.parentIds) {
                this.menuList = []
                return false
            }
            const allRoutes = frameRouter.concat(this.dynamicRoutes)
            const formPage = this.$route.query?.formPage
            const menus = [formPage || meta.parentIds[0], this.$route.name]
            this.menuList = menus.map(item => {
                return allRoutes.find(row => row.name === item)
            })
            const parent = meta.parentIds[0]
            const fn = (menu: any) => {
                return menu?.children?.some((child: any) => child.id === parent)
            }
            const parentMenus: any[] = []
            const addMenu = (menu: any) => {
                const {name, id} = menu
                parentMenus.push({
                    name,
                    id
                })
            }
            menuList.forEach(menu => {
                if (fn(menu)) {
                    addMenu(menu)
                } else {
                    const current = (menu?.children || []).find((item: any) => fn(item))
                    if (current) {
                        addMenu(menu)
                        addMenu(current)
                    }
                }
            })
            this.parentMenus = parentMenus
        }
        getTitle(item: any) {
            if (this.$route.query['subName']) {
                return item.meta.title.replace('新增', '编辑')
            }
            return item?.meta?.title
        }
        toLink(item: any) {
            if (item.name === this.$route.name) {
                return false
            }
            this.$router.push({
                name: item.name
            })
        }
        toPrev() {
            let preRoute = this.$route.meta?.preRoute
            if (!preRoute?.name) {
                preRoute = this.menuList.at(-2)
            }
            this.$router.push({
                name: preRoute?.name,
                query: preRoute?.query
            })
        }
    }
</script>

<style scoped lang="scss">
.breadcrumb-container {
    font-size: 14px;
    font-weight: 400;
    color: $cw-color-text-3;
    width: 100%;
    padding: 10px 14px;
    background-color: var(--color-bg-1);
    position: sticky;
    top: 0;
    z-index: 99;
    .icon-arrows-left {
        font-size: 28px !important;
        margin-right: 5px !important;
    }
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: inline-block;
        vertical-align: top;
        li {
            display: inline-block;
            height: 28px;
            line-height: 28px;
            i {
                font-size: 18px !important;
            }
            &:last-child {
                color: var(--color-text-1);
            }
            .breadcrumb-active {
                cursor: pointer;
                &:hover {
                    color: $cw-color-primary-hover;
                }
            }
        }
    }
    .sub-title {
        display: inline-block;
        font-size: 12px;
        vertical-align: top;
        line-height: 28px;
    }
}
</style>
