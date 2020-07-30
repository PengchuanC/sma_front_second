import axios from 'axios'
import moment from 'moment'
import {baseUrl} from '../common/variables'
import LocalStorage from "../common/localstorage";


const ls = LocalStorage

// 创建axios instance
const api = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
    }
})

// 创建专门用于登录的axios instance
const loginApi = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'content-type': 'application/json',
    }
})

/*
* 在处理http请求前，检查request的header的Authorization属性
* Authorization的值存在三种可能
* Authorization为空：这种情况一般对应登录时的情形，不携带任何信息
* Authorization以Bear或Token开头：标准的jwt信息
* Authorization携带加密字符串：从NOI官网跳转而来，携带用户加密信息
* */
// TODO: 添加请求拦截器，为请求添加token信息
api.interceptors.request.use(
    config => saveIdentification(config).then(config=>addToken(config)).
    then(config=>addSecurityIdentificationInfo(config)),
    error => Promise.reject(error)
)


// 添加token
async function addToken(config) {
    // 添加token的具体操作
    let now = moment(new Date())
    let expire = moment(LocalStorage.getExpireDate(), 'MMMM Do YYYY, h:mm:ss a')
    if (!expire) {
        return config
    }
    // jwt失效，需要刷新jwt
    if (now > expire) {
        return new Promise(
            function (resolve, reject) {
                loginApi.post('/token/refresh', {'refresh': ls.getRefreshToken()}).then(resp=>{
                    config.headers['Authorization'] = `Bearer ${resp.data.access}`
                    resolve(config)
                }).catch(e=>{
                    reject(e)
                })
            }
        )
    }
    config['Authorization'] = LocalStorage.getToken()
    return config
}


/*
* 添加用户身份加密信息到请求中
* 判断用户请求中是否携带有jwt信息，若没有携带，则添加加密信息，否则不添加信息
* */
async function addSecurityIdentificationInfo(config) {
    let identify = config.headers.Authorization
    if (!identify) {
        config.headers['Authorization'] = LocalStorage.getIdentification()
    }
    return config
}

/*
* 拦截请求，储存加密后的用户身份信息到本地
* 此拦截器必须在添加身份信息之前才起作用
*/
async function saveIdentification(config) {
    let auth = config.headers.Authorization
    if (!auth || auth.startsWith('Bear') || auth.startsWith('Token')) {
        return config
    }
    ls.setIdentification(auth)
    return config
}

// 添加响应拦截器，登陆成功自动保存jwt
loginApi.interceptors.response.use(function (resp) {
    let access = resp.data.access
    let refresh = resp.data.refresh
    let tomorrow = moment(new Date()).add(1,'days').format('MMMM Do YYYY, h:mm:ss a')
    ls.setToken(access)
    ls.setRefreshToken(refresh)
    ls.setExpireDate(tomorrow)
    return resp;
}, function (error) {
    ls.removeToken()
    return Promise.reject(error);
});

export  {api, loginApi}