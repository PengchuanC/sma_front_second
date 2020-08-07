/*
* 利用local storage存储信息
* */

class LocalStorage {

    // 保存jwt
    static setToken(token){
        localStorage.setItem('access', token)
    }

    // 获取jwt
    static getToken(){
        return localStorage.getItem('access')
    }

    // 保存jwt-refresh
    static setRefreshToken(token){
        localStorage.setItem('refresh', token)
    }

    // 获取token-refresh
    static getRefreshToken(){
        return localStorage.getItem('refresh')
    }

    // 移除jwt
    static removeToken(){
        localStorage.access = null
        localStorage.refresh = null
        localStorage.expire = null
    }

    // 保存identification
    static setIdentification(identify){
        localStorage.setItem('identify', identify)
    }

    // 获取identification
    static getIdentification(){
        return localStorage.getItem('identify')
    }

    // 设置token失效日期
    static setExpireDate(date) {
        localStorage.setItem('expire', date)
    }

    // 获取token失效日期
    static getExpireDate() {
        return localStorage.getItem('expire')
    }

    // 保存组合ID
    static setPortCode(portCode) {
        localStorage.setItem('portCode', portCode)
    }

    // 获取组合ID
    static getPortCode(){
        return localStorage.getItem('portCode')
    }

}

export default LocalStorage