/**
 * @file 全量引入 bk-magic-vue 组件
 * @author ielgnaw <wuji0223@gmail.com>
 */

import Vue from 'vue'
import bkMagicVue from '@canway/cw-magic-vue'
import theme from '@/theme.json'
Vue.use(bkMagicVue)
bkMagicVue.useTheme(theme)

export const $error = (message, delay = 3000) => {
    if (message === 'cancelRequest') {
        return false
    }
    bkMagicVue.bkMessage({
        message,
        delay,
        theme: 'error',
        limit: 1
    })
}

export const $success = (message, delay = 3000) => {
    bkMagicVue.bkMessage({
        message,
        delay,
        theme: 'success',
        limit: 1
    })
}

export const $info = (message, delay = 3000) => {
    bkMagicVue.bkMessage({
        message,
        delay,
        theme: 'primary',
        limit: 1
    })
}

export const $warn = (message, delay = 3000) => {
    bkMagicVue.bkMessage({
        message,
        delay,
        theme: 'warning',
        limit: 1,
        hasCloseIcon: true
    })
}

// Vue prototype mount
Vue.prototype.$error = $error
Vue.prototype.$success = $success
Vue.prototype.$info = $info
Vue.prototype.$warn = $warn
Vue.prototype.$bkInfo = bkMagicVue.bkInfoBox
Vue.prototype.$bkMessage = bkMagicVue.bkMessage
Vue.prototype.$bkNotify = bkMagicVue.bkNotify
Vue.prototype.$bkLoading = bkMagicVue.bkLoading
