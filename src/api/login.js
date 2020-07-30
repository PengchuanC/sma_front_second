import {loginApi} from "./base"


/*
* 登录函数
* TODO：登录成功/失败后的操作
* */
function login(self) {
    loginApi.post('/token/', {
        username: self.username,
        password: self.password
    }).then(resp=>{
        console.log(resp.status)
    }).catch(()=>{
        self.$router.push({name: '404'})
    })
}

export {login}