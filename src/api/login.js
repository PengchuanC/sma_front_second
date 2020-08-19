import {loginApi} from "./base"


/*
* 登录函数
* TODO：登录成功/失败后的操作
* */
function login(self) {
    loginApi.post('/token/', {
        username: self.username,
        password: self.password
    }).then(()=>{
        self.$router.push({name: 'user'})
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

export {login}