<template>
    <div>
        <bk-dialog
            v-model="isShow"
            :width="1000"
            :mask-close="true"
            transfer
            :show-footer="false"
            :scrollable="false"
            :z-index="1000"
            :height-adaption="true"
            render-directive="if">
            <div class="version-log" v-bkloading="{ isLoading: loading, zIndex: 1001 }">
                <ul class="version-log-tree">
                    <li
                        :class="['tree-item',item === activeItem && 'active-item']"
                        v-for="(item,index) in versionList"
                        :key="item.version"
                        @click="selectNode(item)">
                        <div class="tree-item-version">
                            <span
                                :class="['version',!index && 'current-version']"
                                v-bk-overflow-tips>
                                {{ item.version || '--' }}
                            </span>
                            <bk-tag theme="info" type="filled" v-if="!index">当前版本</bk-tag>
                        </div>
                        <span class="tree-item-date">{{ item.time || '--' }}</span>
                    </li>
                </ul>
                <div class="version-log-content" v-html="versionDetail">
                </div>
            </div>
        </bk-dialog>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Watch } from 'vue-property-decorator'

    @Component({
        components: {}
    })
    export default class VersionLog extends Vue {
        isShow: boolean = false
        versionList: Array<any> = []
        activeItem: any = {}
        versionDetail: string = ''
        loading: boolean = false

        @Watch('activeItem', {
            deep: true
        })
        onActiveItemChange() {
            this.getversionLogDetail()
        }
        show() {
            this.isShow = true
            this.getVersionLogsList()
        }
        selectNode(item) {
            this.activeItem = item
        }
        async getVersionLogsList() {
            this.loading = true
            try {
                const res = await this.$api.Server.getVersionLogsList()
                if (!res.result) {
                    return
                }
                this.versionList = res.data.map(item => {
                    return {
                        version: item.at() || '--',
                        time: item.at(-1) || '--'
                    }
                })
                this.activeItem = this.versionList.at() || {}
            } finally {
                this.loading = false
            }
        }
        async getversionLogDetail() {
            this.loading = true
            try {
                const params = {
                    log_version: this.activeItem.version
                }
                const res = await this.$api.Server.getversionLogDetail(params)
                if (!res.result) {
                    this.versionDetail = ''
                    return
                }
                this.versionDetail = res.data
            } finally {
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
.version-log {
    display: flex;

    .version-log-tree {
        width: 240px;
        height: calc(100vh - 200px) !important;
        overflow-y: auto;
        border-right: 1px solid #f0f1f5;

        .tree-item {
            padding: 6px 10px 6px 20px;
            cursor: pointer;

            &:hover {
                background: #f0f1f5;
            }

            .tree-item-version {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .current-version {
                    max-width: 130px;
                }

                .version {
                    color: var(--color-text-1);
                    font-size: 16px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                }
            }

            .tree-item-date {
                color: #979ba5;
            }
        }

        .active-item {
            border-left: #3a84ff 6px solid;
            padding-left: 14px;
            background: #f0f1f5;
        }
    }

    .version-log-content {
        flex: 1;
        padding: 0 10px 6px 10px;
        height: calc(100vh - 200px) !important;
        overflow: auto;
        /deep/ table {
            width: 100%;
            border-collapse: collapse;
            th, td {
                border: 1px solid #eee;
                padding: 10px;
            }
            th {
                text-align: left;
            }
        }
    }
}
</style>
