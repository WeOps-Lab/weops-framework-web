<template>
    <div id="main-container">
        <bread-crumb></bread-crumb>
        <keep-alive :include="menuList">
            <router-view v-bind="$attrs"></router-view>
        </keep-alive>
    </div>
</template>

<script lang="ts">
    import BreadCrumb from '@/components/breadCrumb.vue'
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({
        components: {
            BreadCrumb
        }
    })
    export default class MainContainer extends Vue {
        @Prop({ type: Object, default: () => ({}) }) user: any

        get routerKey() {
            return this.$route.params.renderKey
        }

        get menuList() {
            return this.$store.getters.cacheRouter
        }
    }
</script>

<style lang="scss" scoped>
#main-container {
    max-height: calc(100vh - 52px);
    height: calc(100vh - 52px);
    box-sizing: border-box;
}
</style>
