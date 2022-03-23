// 常量或全局变量


// 模式：production ｜ development ｜ test
const MODE = Object.freeze({
    production: Symbol(1),
    development: Symbol(2),
    test: Symbol(3)
})

const mode = MODE.production

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


export {Host, chartColor}
