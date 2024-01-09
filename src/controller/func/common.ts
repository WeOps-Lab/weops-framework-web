import Vue from 'vue'
import html2canvas from 'html2canvas'
interface FieldItem {
    bk_biz_id: number,
    id: number,
    bk_supplier_account: string,
    bk_obj_id: string,
    bk_property_id: string,
    bk_property_name: string,
    bk_property_type: string,
    option: null,
    description: string,
    [key: string]: any
}
interface ColumnItem {
    key?: string,
    type?: string,
    label?: string,
    fixed?: string,
    scopedSlots?: string,
    minWidth?: string,
    option?: undefined | Array<any>
  }
interface RecordItem {
    row: {
        [key: string]: any
    },
    colKey: string,
    index: number,
  }
// 去重
Vue.prototype.$DupRem = function(list) {
    const newArr = []
    for (let i = 0; i < list.length; i++) {
        if (newArr.indexOf(list[i]) < 0) {
            newArr.push(list[i])
        }
    }
    return newArr
}

Vue.prototype.$ArrayObjDup = function distinct1(arr, key) {
    const newObj = {}; const newArr = []
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (!newObj[item[key]]) {
            newObj[item[key]] = newArr.push(item)
        }
    }
    return newArr
}

// 深拷贝
Vue.prototype.$Copy = function(data) {
    return JSON.parse(JSON.stringify(data))
}

// 时间格式转string
Vue.prototype.$TransTime = function(date) {
    const data = new Date(date)
    const sep = '-'
    const year = data.getFullYear()
    let month: string | number = data.getMonth() + 1
    let strDate: string | number = data.getDate()
    if (month >= 1 && month <= 9) {
        month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
    }
    return year + sep + month + sep + strDate
}

// 时间管理  days:时间间隔 startDate:初始时间 type:返回时间格式,默认返回string格式（string or time）
Vue.prototype.$DateDisplay = function(days, type, startDate) {
    const end = startDate ? new Date(startDate) : new Date()
    const start = startDate ? new Date(startDate) : new Date()
    end.setTime(start.getTime())
    start.setTime(start.getTime() - 3600 * 1000 * 24 * days)
    return {
        endTime: type === 'time' ? end : Vue.prototype.$TransTime(end),
        startTime: type === 'time' ? start : Vue.prototype.$TransTime(start)
    }
}

// 时间戳与时间互相转换
Vue.prototype.$stampToTime = (timeStamp) => {
    const date = new Date(timeStamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const clockTime = date.toString().split(' ')[4]
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day) + ' ' + clockTime
}

// 时间差值计算转换为'天前,周前,小时前,分钟前'
Vue.prototype.$timeAgo = (dateTimeStamp) => {
    // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    const minute = 1000 * 60 // 把分，时，天，周，半个月，一个月用毫秒表示
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    // const halfamonth = day * 15
    const month = day * 30
    const now = new Date().getTime() // 获取当前时间毫秒
    const diffValue = now - dateTimeStamp// 时间差

    if (diffValue < 0) {
        return
    }
    const minC = diffValue / minute// 计算时间差的分，时，天，周，月
    const hourC = diffValue / hour
    const dayC = diffValue / day
    const weekC = diffValue / week
    const monthC = diffValue / month
    let result
    if (monthC >= 1 && monthC <= 3) {
        result = ' ' + parseInt(String(monthC)) + '月'
    } else if (weekC >= 1 && weekC <= 3) {
        result = ' ' + parseInt(String(weekC)) + '周'
    } else if (dayC >= 1 && dayC <= 6) {
        result = ' ' + parseInt(String(dayC)) + '天'
    } else if (hourC >= 1 && hourC <= 23) {
        result = ' ' + parseInt(String(hourC)) + '小时'
    } else if (minC >= 1 && minC <= 59) {
        result = ' ' + parseInt(String(minC)) + '分钟'
    } else if (diffValue >= 0 && diffValue <= minute) {
        result = ' ' + parseInt(String(diffValue)) + '秒'
    } else {
        const datetime = new Date()
        datetime.setTime(dateTimeStamp)
        const Nyear = datetime.getFullYear()
        const Nmonth = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
        const Ndate = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
        // const Nhour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
        // const Nminute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
        // const Nsecond = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
        result = Nyear + '-' + Nmonth + '-' + Ndate
    }
    return result
}
export const deepClone = (obj, hash = new WeakMap()) => {
    if (Object(obj) !== obj) return obj
    if (obj instanceof Set) return new Set(obj)
    if (hash.has(obj)) return hash.get(obj)
    const result = obj instanceof Date ? new Date(obj)
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
        : obj.constructor ? new obj.constructor()
        : Object.create(null)
    hash.set(obj, result)
    if (obj instanceof Map) {
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)))
    }
    return Object.assign(result, ...Object.keys(obj).map(key => ({[key]: deepClone(obj[key], hash)})))
}
export const transformDataKey = (data = {}, flag = false) => {
    if (!['[object Array]', '[object Object]'].includes(Object.prototype.toString.call(data))) return data
    const result = {}
    if (Array.isArray(data)) {
        return data.map(item => transformDataKey(item, flag))
    }
    Object.keys(data).forEach((key) => {
        const matchList = flag ? key.match(/([a-z][A-Z])/g) : key.match(/(_[a-zA-Z])/g)
        let newKey = key
        const item = data[key]
        if (matchList) {
            matchList.forEach((set) => {
                if (flag) {
                    newKey = newKey.replace(set, set.split('').join('_')
                        .toLocaleLowerCase())
                } else {
                    newKey = newKey.replace(set, set.replace('_', '').toLocaleUpperCase())
                }
            })
        }
        if (item && typeof item === 'object' && Object.keys(item).length) {
            result[newKey] = transformDataKey(item, flag)
        } else {
            result[newKey] = item
        }
    })
    return result
}
export const random = (n) => { // 生成n位长度的字符串
    const str = 'abcdefghijklmnopqrstuvwxyz0123456789' // 可以作为常量放到random外面
    let result = ''
    for (let i = 0; i < n; i++) {
        result += str[parseInt(String(Math.random() * str.length))]
    }
    return result
}

export const isPostiveInt = val => /^[1-9][0-9]*$/.test(`${val}`)

Vue.prototype.$random = random

Vue.prototype.GMTToStr = (time) => {
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const clockTime = date.toString().split(' ')[4]
    return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + clockTime
}

// 暂时解决删除分页最后一页的唯一数据后，再次获取列表时因为当前页码数没有数据而返回404的问题
Vue.prototype.rollbackPageNum = (pageNum, pageSize, totalNum) => {
    if (totalNum === 0) {
        return pageNum
    } else {
        return totalNum % pageSize === 0 ? Math.floor(totalNum / pageSize) : pageNum
    }
}

Vue.prototype.$bus = new Vue()

Vue.prototype.$exportImg = function(elementId, fileName, callback) {
    const dom = document.getElementById(elementId)
    html2canvas(dom, {
        allowTaint: true
    }).then(canvas => {
        const imgUrl = canvas.toDataURL('image/jpg')
        const link = document.createElement('a')
        link.setAttribute('href', imgUrl)
        link.setAttribute('download', fileName)
        link.click()
        if (callback) {
            callback()
        }
    })
}

Vue.prototype.$formatDate = function(nowday) {
    const year = nowday.getFullYear()
    const month = nowday.getMonth() + 1
    const date = nowday.getDate()
    const hour = nowday.getHours()
    const minute = nowday.getMinutes()
    const second = nowday.getSeconds()
    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date) +
        ' ' + (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute) + ':' +
        (second < 10 ? '0' + second : second)
}

// 暂时解决删除分页最后一页的唯一数据后，再次获取列表时因为当前页码数没有数据而返回404的问题
Vue.prototype.rollbackPageNum = (pageNum, pageSize, totalNum) => {
    if (totalNum === 0) {
        return pageNum
    } else {
        return totalNum % pageSize === 0 ? Math.floor(totalNum / pageSize) : pageNum
    }
}

Vue.prototype.$FormatTime = getLocaleDateTime

/**
 * 获取时间 格式为：format
 * format 参数为时间格式
 * 注：若方法返回的值是一个两位的数字。但是，返回值不总是两位的，如果该值小于 10，则仅返回一位数字。
 */
function getLocaleDateTime(format, time) {
    if (!time) {
        return '--'
    }
    const date = new Date(time)
    const getyear = date.getFullYear()// 返回一个表示年份的 4 位数字。
    const getmonth = date.getMonth() + 1// 返回表示月份的数字，返回值是 0（一月） 到 11（十二月） 之间的一个整数。
    const getday = date.getDate()// 返回月份的某一天，返回值是 1 ~ 31 之间的一个整数。
    const gethour = date.getHours()// 返回值是 0 （午夜） 到 23 （晚上 11 点）之间的一个整数。
    const getminute = date.getMinutes()// 返回值是 0 ~ 59 之间的一个整数。
    const getsecond = date.getSeconds()// 返回值是 0 ~ 59 之间的一个整数。
    // 不过返回值不总是两位的，如果返回的值小于 10，则仅返回一位数字。故进行加“0”操作。
    const getMonth = changeTime(getmonth)
    const getHour = changeTime(gethour)
    const getDay = changeTime(getday)
    const getMinute = changeTime(getminute)
    const getSecond = changeTime(getsecond)
    if (format === 'yyyy-MM-dd hh:mm:ss') {
        return getyear + '-' + getMonth + '-' + getDay + ' ' + getHour + ':' + getMinute + ':' + getSecond
    }
    return getyear + '-' + getMonth + '-' + getDay
}

/**
 * 判断是否需要在时间前面加“0”
 * @param time：需要处理的时间数字
 * @returns {*}
 */
function changeTime(time) {
    if (time < 10) {
        time = '0' + time
    }
    return time
}

Vue.prototype.$groupData = handleGroupData
// 将字段数据进行分组
function handleGroupData(item, data) {
    const index = data.findIndex(tex => tex.key === item['bk_property_group'])
    if (index !== -1) {
        data[index].children.push(item)
        return false
    }
    data.push(
        {
            title: item['bk_property_group_name'],
            key: item['bk_property_group'],
            children: [item],
            collapseStatus: true,
            id: this.$random(3)
        }
    )
}

function getSvgIcon() {
    // @ts-ignore
    const data = require.context('@/assets/img/asset-model-icon', false, /\.svg$/).keys()
    for (const i in data) {
        data[i] = data[i].replace(/\.\//g, '').replace(/\.svg/g, '')
    }
    return data
}

Vue.prototype.$getSvgIcon = getSvgIcon

Vue.prototype.$buildRules = buildRules

function buildRules(item, rules) {
    rules[item.bk_property_id] = []
    if (item.isrequired) {
        rules[item.bk_property_id].push({
            required: true,
            message: `请填写${item.bk_property_name}信息`,
            trigger: 'blur'
        })
        if (['singlechar', 'longchar'].includes(item['bk_property_type'])) {
            if (item.option) {
                const regExp = String(item.option.slice(0, 1)) === '/' ? item.option.slice(1, item.option.length - 2) : item.option
                rules[item.bk_property_id].push({
                    validator: function(val) {
                        const validatorReg = new RegExp(`${regExp}`)
                        return val ? validatorReg.test(val) : !validatorReg.test(val)
                    },
                    message: `请填写正确的${item.bk_property_name}格式`,
                    trigger: 'change'
                })
            }
        }
        if (['int', 'float'].includes(item['bk_property_type'])) {
            if (item.option) {
                if (item.option.min) {
                    rules[item.bk_property_id].push({
                        validator: function(val) {
                            return val ? Number(val) >= item.option.min : Number(val) < item.option.min
                        },
                        message: `最小值为${item.option.min}`,
                        trigger: 'change'
                    })
                }
                if (item.option.max) {
                    rules[item.bk_property_id].push({
                        validator: function(val) {
                            return Number(val) <= item.option.max
                        },
                        message: `最大值为${item.option.max}`,
                        trigger: 'change'
                    })
                }
            }
        }
    }
}

Vue.prototype.$clearCache = function($vue) {
    if ($vue.$vnode && $vue.$vnode.data.keepAlive) {
        if ($vue.$vnode.parent && $vue.$vnode.parent.componentInstance && $vue.$vnode.parent.componentInstance.cache) {
            if ($vue.$vnode.componentOptions) {
                const key = $vue.$vnode.key === null
                    ? $vue.$vnode.componentOptions.Ctor.cid + ($vue.$vnode.componentOptions.tag ? `::${$vue.$vnode.componentOptions.tag}` : '')
                    : $vue.$vnode.key
                const cache = $vue.$vnode.parent.componentInstance.cache
                const keys = $vue.$vnode.parent.componentInstance.keys
                if (cache[key]) {
                    if (keys.length) {
                        const index = keys.indexOf(key)
                        if (index > -1) {
                            keys.splice(index, 1)
                        }
                    }
                    delete cache[key]
                }
            }
        }
    }
    // $vue.$destroy()
}

// 判断两个对象是否相等
Vue.prototype.$compareFormData = (newValue, oldValue) => {
    return JSON.stringify(newValue) === JSON.stringify(oldValue)
}

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

// 前端通过url下载文件，自定义文件名称
export function urlDownload(url, fileName = '下载文件') {
    const httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', url, true)
    httpRequest.responseType = 'blob'
    httpRequest.onload = function() {
        const url = window.URL.createObjectURL(httpRequest.response)
        const eleLink = document.createElement('a')
        eleLink.href = url
        eleLink.download = fileName
        document.body.appendChild(eleLink)
        eleLink.click()
        // 移除a标签
        document.body.removeChild(eleLink)
    }
    httpRequest.send()
}


function getDisplayValue(value, targetCol: ColumnItem = {}) {
    switch (targetCol.type) {
        case 'time':
            return value ? Vue.prototype.$FormatTime('yyyy-MM-dd hh:mm:ss', value) : '--'
        case 'bool':
            return value ? '是' : '否'
        case 'enum':
            return value || value === 0 || value === false
            ? (targetCol.option.find(item => item.id === value)?.name || '--') : '--'
        default:
            return [null, undefined, ''].includes(value) ? '--' : value
    }
}
/**
 * 处理模型标识字段/列表字段值的展示
 *
 * @param {RecordItem} record 表格插槽行信息
 * @param {ColumnItem[]} columns 表格插槽全部列数据，用于根据当前列类型及列索引展示数据
 *
 * @return {string|number} 格式化后的数据内容
 **/
Vue.prototype.$getFieldDisplayValue = (record: RecordItem, columns: ColumnItem[] = []) => {
    const { colKey: key, row } = record
    // 标识字段（通常为表格第一或第二个字段）为主机名，则需要按照主机名（IP）格式展示值
    const firstKey = columns[+(columns[0]?.type === 'selection')]?.key
    if (firstKey === key && key === 'bk_host_name') {
        const ipVal = row['bk_host_innerip']
        return `${row[key] || ''}${ipVal ? `(${ipVal})` : ''}` || '--'
    } else {
        const targetCol = columns?.find(el => el.key === key)
        return getDisplayValue(row[key], targetCol)
    }
}

/**
 * 根据模型字段返回表格表头列表
 *
 * @param {FieldItem[] | FieldItem} field 模型的标识字段对象/展示字段列表
 * @param {ColumnItem[]} extraCol 需要额外插入的列列表
 *
 * @return {ColumnItem[]} 包含标识字段/展示字段的表格表头列表
 **/
Vue.prototype.$getDisplayFieldColumn = (field: FieldItem[] | FieldItem = [],  extraCol: ColumnItem[] = []) => {
    const data = Array.isArray(field) ? field : [field]
    const list: ColumnItem[] = data.filter(el => !extraCol.find(item => item.key === el.bk_property_id ))
    .map((el, index) => ({
        key: el.bk_property_id,
        label: el.bk_property_name,
        type: el.bk_property_type,
        fixed: index === 0 ? 'left' : undefined, // 标识字段固定左侧
        scopedSlots: 'display_field',
        minWidth: '120px',
        option: el.bk_property_type === 'enum' ? el.option : undefined
    }))
    return list.concat(extraCol)
}
