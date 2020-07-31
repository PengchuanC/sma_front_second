import {loginApi} from "./base"
import LocalStorage from "../common/localstorage";


/*
* 登录函数
* TODO：登录成功/失败后的操作
* */
function login(self) {
    loginApi.post('/token/', {
        username: self.username,
        password: self.password
    }).then(()=>{
        if (!self.noResign) {
            LocalStorage.setRefreshToken('')
        }
        self.$router.push({name: 'home'})
    }).catch((e)=>{
        console.log(e)
        self.$router.push({name: '404'})
    })
}

export {login}