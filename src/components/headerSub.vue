<template>
    <div :class="['header-sub-container', isFixed && 'sub-fixed']" :style="{ ...extStyle, top: `${topValue}px` }">
        <div :class="['header-sub-title', isBack && 'pl-35']">
            <span class="header-title-icon" v-if="isBack" @click="toPrev">
                <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4756"><path d="M416 480h320v64H416l96 96-48 48-176-176 176-176 48 48-96 96z" p-id="4757"></path></svg>
            </span>
            <template v-if="title">
                {{ title }}
            </template>
            <template v-else>
                <slot name="title"></slot>
            </template>
            <span class="fr collapse" v-if="operationShow" @click="isExpand = !isExpand">
                <i :class="[isExpand ? 'weops-circle-up' : 'weops-circle-down','cw-icon']"></i>
                {{ isExpand ? '收起' : '展开' }}
            </span>
        </div>
        <template v-if="isExpand">
            <div>
                <slot name="content"></slot>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({})
    export default class HeaderSub extends Vue {
        @Prop({ type: String, default: '' }) title: string
        @Prop({ type: Boolean, default: false }) operationShow: boolean
        @Prop({ type: Object, default: () => ({}) }) extStyle: any
        @Prop({ type: Boolean, default: false }) isBack: boolean
        isExpand: boolean = true
        isFirst: boolean = true
        isFixed: boolean = false

        get topValue(): number {
            const breadCrumb = this.$route.meta?.breadCrumb
            return breadCrumb ? 18 : -20
        }

        activated(): void {
            this.isExpand = true
        }

        toPrev(): void {
            this.$router.go(-1)
        }

        handleScroll(): void {
            const scrollTop: number = document.querySelector('.container-content').scrollTop
            if (scrollTop > 100) {
                this.isFixed = true
                this.isExpand = false
            }
            if (scrollTop === 0) {
                this.isFixed = false
                if (this.isFirst) {
                    this.isExpand = true
                }
            }
            if (this.isFirst) this.isFirst = !this.isFirst
        }
    }
</script>

<style scoped lang="scss">
.header-sub-container {
    width: 100%;
    // background: #fff;
    position: sticky;
    z-index: 99;
    min-height: 50px;
    line-height: 50px;
    .header-sub-title {
        display: flex;
        font-size: 16px;
        font-weight: 500;
        color: var(--color-text-1);
        align-items: center;
        position: relative;
        min-height: 50px;
        &.pl-35 {
            padding-left: 35px;
        }
        .header-title-icon {
            width: 32px;
            height: 32px;
            font-size: 32px;
            color: $cw-color-primary;
            cursor: pointer;
            display: inline-block;
            line-height: 0;
            position: absolute;
            left: 0;
        }
        .collapse {
            .cw-icon {
                font-size: 16px;
            }
        }
    }
    &.sub-fixed {
        position: fixed;
        top: 80px;
        z-index: 999;
        box-shadow: 3px 2px 3px #ccc;
    }
    .fr {
        cursor: pointer;
        position: fixed;
        right: 40px;
        color: #63656E;
        font-size: 14px;
    }
    .header-menu-list {
        margin-left: -6px;
        li {
            font-weight: 500;
            display: inline-block;
            padding: 0 0 13px 0;
            color: var(--color-text-2);
            cursor: pointer;
            position: relative;
            margin: 0 16px;
            &.active {
                // color: var(--color-text-1);
                border-bottom: 3px solid $cw-color-primary;
            }
            &:hover {
                // color: var(--color-text-1);
            }
        }
    }
}
</style>
