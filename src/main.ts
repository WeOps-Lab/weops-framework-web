// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// 按需全量引入 bk-magic-vue 样式
import '@canway/cw-magic-vue/dist/bk-magic-vue.min.css'
import '@/assets/componentLibrary/demand-import'
// import '@/assets/componentLibrary/fully-import'
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
import 'jquery'
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
