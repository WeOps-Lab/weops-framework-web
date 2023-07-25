// server模块（各模块）api
import { get, post, put, reUrl } from '@/api/axiosconfig/axiosconfig'

// 返回在vue模板中的调用接口
export default {
    // ----GET-------------------------------------------------------------
    // 测试 get 请求
    testGet: function(params) {
        return get(reUrl + '/test_get/', params)
    },
    getMonitorMenus: function(params) {
        return get(reUrl + '/get_monitor_menus/', params)
    },
    getLogo: function(params, config) {
        return get(reUrl + '/system/mgmt/logo/', params, config)
    },
    updateLogo: function(params) {
        return put(reUrl + '/system/mgmt/logo/', params)
    },
    getBkUsers: function(params) {
        return get(reUrl + '/system/mgmt/sys_users/', params)
    },
    getBizs: function(params) {
        return get(reUrl + '/system/mgmt/sys_users/bizs/', params)
    },
    getLogs: function(params) {
        return get(reUrl + '/system/mgmt/operation_log/', params)
    },
    checkLogin: function(params) {
        return get(reUrl + '/check_login/', params)
    },
    // ----POST------------------------------------------------------------
    resetlogo: function(params) {
        return post(reUrl + '/system/mgmt/logo/reset/', params, {showLoad: true})
    },
    syncUsers: function(params) {
        return post(reUrl + '/system/mgmt/sys_users/pull_bk_user/', params, {showLoad: true})
    },
    testEsb: function(params) {
        return post(reUrl + '/common/esb_test/', params)
    },
    getVersionLogsList: function(params = {}) {
        return get(reUrl + '/version_log/version_logs_list/', params)
    },
    getversionLogDetail: function(params = {}) {
        return get(reUrl + '/version_log/version_log_detail/', params)
    }
}
