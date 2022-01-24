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