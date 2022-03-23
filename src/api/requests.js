import {extend} from "umi-request"

import {Host} from '@/common/variables'
import localstorage from "@/common/localstorage";


const baseUrl = Host + 'api/sma/v3/'
const api = extend({
    prefix: baseUrl,
    timeout: 5000,
})

// 拦截器，添加token
api.interceptors.request.use((url, options)=>{
    const access = localstorage.getToken()
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${access}`
    }
    return {
        url,
        options: {...options, headers}
    }
})

/*
* 登陆与认证
* */

// 登陆-用户名和密码认证方式，仅提供给管理员使用
export function upLogin(username, password) {
    return api.post('login/', {data: {username, password}}).then(r=>{
        localstorage.setToken(r.access)
    })
}

// 登陆-验证客户身份证号，确定是否为SMA客户
export function checkIdentify(identify) {
    return api.post('sms/idcheck/', {data: {identify}})
}

// 登陆-获取验证码
export function fetchSmsCode(username, mobile) {
    return api.get('sms/code/', {params: {username, mobile}})
}

// 登陆-验证短信验证码
export function verifySmsCode(username, code) {
    return api.post('sms/code/', {data: {username, code}})
}

/**
 * user页面
 * */

// 获取全部组合信息
export function portfolioOutlook() {
    return api.get('portfolio/')
}

export function operatingPeriod(port_code){
    return api.get('portfolio/date/', {params: {port_code}})
}

/*
* records页面
* */

export function transHistory(port_code, start, end) {
    return api.get('portfolio/records/', {params:{port_code, start, end}})
}

/*
* account页面
* */

// 资产配置情况
export function assetAllocate(port_code, date) {
    return api.get('portfolio/asset/',{params: {port_code, date}})
}

// 分类资产配置详情
export function assetCategory(port_code, date) {
    return api.get('portfolio/asset/category/',{params: {port_code, date}})
}

// 单只基金交易详情
export function assetTrade(port_code, date, fund) {
    return api.post('portfolio/asset/category/',{data: {port_code, date, fund}})
}

/*
* home页面
**/

// 新闻
export function hotNews(){
    return api.get('news/')
}

export function categoryNews(category, page){
    return api.get('news/advance/', {params: {category, page}})
}

// 专栏
export function reports(port_code){
    return api.get('reports/', {params:{port_code}})
}

export function reportsAdvance(port_code){
    return api.get('reports/advance/', {params:{port_code}})
}

export function reportsAdvanceDetail(port_code, page){
    return api.post('reports/advance/', {data: {port_code, page}})
}

// 产品通知
export function notifies(port_code){
    return api.get('notifies/', {params:{port_code}})
}

// 聊天
export function chatHistory(port_code) {
    return api.get('message/', {params: {port_code}})
}

export function sendMessage(port_code, message, date){
    return api.put('message/', {data: {port_code, message, date}})
}

export function chatComments(port_code){
    return api.post('message/', {data: {port_code}})
}

/*
* performance页面
* */

// 表格数据
export function performanceTable(port_code, beginDate, endDate){
    return api.get('portfolio/performance/table/', {params: {port_code, beginDate, endDate}})
}

// 组合概要
export function portfolioInfo(port_code) {
    return api.post('portfolio/', {data: {port_code}})
}

// 费用一览
export function assetFee(port_code, start, end) {
    return api.get('portfolio/asset/fee/',{params: {port_code, start, end}})
}

// 柱状图数据
export function performanceBar(port_code, beginDate, endDate, freq, period) {
    return api.get('portfolio/performance/bar/', {params: {port_code, beginDate, endDate, freq, period}})
}

// 折线图数据
export function performanceLine(port_code, beginDate, endDate, period) {
    return api.get('portfolio/performance/line/', {params: {port_code, beginDate, endDate, period}})
}
