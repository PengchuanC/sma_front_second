// 常量或全局变量


// 模式：production ｜ development ｜ test
const MODE = Object.freeze({
    production: Symbol(1),
    development: Symbol(2),
    test: Symbol(3)
})

const mode = MODE.test

// 后端网址
let baseUrl;
switch (mode) {
    case MODE.production:
        baseUrl = "https://sma.nomuraoi-sec.com/api/sma/"
        break
    case MODE.development:
        baseUrl = "http://10.170.129.129/api/sma/"
        break
    case MODE.test:
        baseUrl = "http://localhost:8000/api/sma/"
        break
    default:
        baseUrl = "http://10.170.129.129/api/sma/"
}

// host
let Host
switch (mode) {
    case MODE.production:
        Host = "https://sma.nomuraoi-sec.com/"
        break
    case MODE.development:
        Host = "http://10.170.129.129/"
        break
    case MODE.test:
        Host = "http://localhost:8000/"
        break
    default:
        Host = "http://10.170.129.129/"
}

const chartColor = ['#900000','#C00000', '#D18484', '#E0B5B5', '#A6A6A6']


export {baseUrl, Host, chartColor}
