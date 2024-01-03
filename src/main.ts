// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 按需全量引入 bk-magic-vue 样式
import '@canway/cw-magic-vue/dist/bk-magic-vue.min.css'
// import '@/assets/componentLibrary/demand-import'
import '@/assets/componentLibrary/fully-import'
// 几何图
import * as Echarts from 'echarts'
// 引用API文件
import api from './api/index'
// 公共方法
import './controller/func/common'
// 统一样式引入
import './assets/index'
// 引入自定义方法
const Dire:any = require('./directive')
// 引入自定义组件
import Component from './components/index'
// vuex
import store from './store/index'
// import globalMixin from './mixins/global'
import 'jquery'
// const copy:any = require('./directive/modal/copy')
import copy from './directive/modal/copy'
import cwMessage from './prototype/message'
import uploader from 'vue-simple-uploader'
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
Vue.use(uploader)
// @ts-ignore
Vue.use(Echarts)
Vue.use(Dire)
Vue.use(copy)
Vue.use(Component)
Vue.prototype.$message = cwMessage
Vue.prototype.$echarts = Echarts
// 将API方法绑定到全局
Vue.prototype.$http = axios
Vue.prototype.$api = api
// window['tinymce'].baseURL = window.location.origin + window.location.pathname + '/static/tinymce'
// window['tinymce'].suffix = '.min'
const headTheme = 'light' // 选择 light 或 blue
Vue.prototype.headTheme = headTheme

// 应用CMDB依赖
Vue.prototype.$copy = function(val) {
    if (!val) return {}
    return JSON.parse(JSON.stringify(val))
}
Vue.prototype.$apply = function(data) {
    return (<any>Object).assign({}, data, data)
}
Vue.prototype.$deepClone = function(val) {
    if (!val) return {}
    const a: any = {}
    a.o = val
    return JSON.parse(JSON.stringify(a.o))
}

Vue.prototype.$t = function(val) {
    return val
}
// 在template中使用可选链
Vue.prototype.$optionChain = (obj: any, ...rest: string[]): string | number => {
    let tmp = obj
    for (const key in rest) {
        const name = rest[key]
        tmp = tmp?.[name]
    }
    if (tmp === 0) return tmp
    else return tmp || '--'
}
// 时间戳与时间互相转换
Vue.prototype.$stampToTime = (timeStamp) => {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const clockTime = date.toString().split(' ')[4]
    return year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day) + ' ' + clockTime
}
// ts-ignore
// Vue.directive('copy', copy)

// 混入
// Vue.mixin(globalMixin);

// 自动导入子应用中的main.js文件
// @ts-ignore
const appFiles = require.context('@/projects', true, /\/main$/)
appFiles.keys().forEach(key => {
    appFiles(key)
})

/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    data() {
        return {
            website: '我是全局变量'
        }
    },
    template: '<App/>'
})
