import {api, loginApi} from "./base"
import LocalStorage from "@/common/localstorage";


/*
* 登录函数
* TODO：登录成功/失败后的操作
* */
function login(self) {
    loginApi.post('/token/', {
        username: self.username,
        password: self.password
    }).then(()=>{
        // self.$router.push({name: 'user'})
        getPortfolio(self)
    }).catch(()=>{
        self.$Notice.error({
            title: '登陆失败',
            desc: '即将前往产品中心，请尝试从产品中心登陆'
        });
        setTimeout(()=>{
            window.location.href = 'https://www.nomuraoi-sec.com/pages/account/account_login.jsp?toURL=/pages/product/product_catalog.jsp&toParams='
        }, 3000
        )
    })
}


export function getPortfolio(self){
    api.get('/v2/portfolio/').then(resp=>{
        self.portfolio = resp.data
        LocalStorage.setPortCode(resp.data[0].port_code)
        LocalStorage.setPortNums(resp.data.length)
        if (resp.data.length > 1){
            self.$router.push({name: 'user'})
        }else{
            self.$router.push({name: 'home'})
        }
    }).catch(()=>{
        this.$Notice.error({
            title: '您尚未登陆',
            desc: '即将返回至登陆页面，请先进行登陆'
        })
        this.$router.push({name: 'auth'})
    })
}


export function resetPassword(self){
    loginApi.put('/manage/reset/', {
        username: self.username, password: self.password, password1: self.newPassword
    }).then(()=>{
        self.success = true
    }).catch(()=>{
        self.$Notice.warning({
            title: '密码修改失败',
            desc: "请检查用户名和原密码"
        })
    })
}

export {login}