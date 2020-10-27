import {api} from "./base"
import moment from 'moment'
import 'moment/locale/zh-cn'
import numeral from 'numeral'
import LocalStorage from "@/common/localstorage"

export function getNews(self) {
    api.get('/v2/news/').then(resp=>{
        self.newsList = resp.data.map(x=>{
            x.realdate = x.update
            x.update = moment(x.update).fromNow()
            return x
        })
    })
}

// 获取收益资产配置数据
export function getAllocate(self, modifyDate=true) {
    numeral.zeroFormat('0.00')
    numeral.nullFormat('0.00')
    self.fetched = false
    let date;
    if (self.selectedDate) {
        date = moment(self.selectedDate).format('YYYY-MM-DD')
    }
    api.get('/v2/portfolio/asset/', {
        params: {port_code: LocalStorage.getPortCode(), date: date}
    }).then(resp=>{
        let data = resp.data
        if (data) {
            self.selectedDate = modifyDate? data.date: self.selectedDate
            self.ratio = data.ratio
            self.profit = data.profit
            self.ratio = data.ratio.map(x=>{
                if (x.category !== '现金') {
                    return {
                        category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                        ratio: (x.ratio * 100).toFixed(2), children: [], _loading: false, id :x.id
                    }
                }
                return {
                    category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                    ratio: (x.ratio * 100).toFixed(2)
                }
            })
            self.ret = data.ret
            self.net_asset = numeral(data.net_asset).format('0,0')
        } else {
            self.selectedDate = modifyDate? data.date: self.selectedDate
            self.ratio = []
            self.ret = null
            self.net_asset = null
        }
        self.fetched = true
    }).catch(()=>{
        if (self.$route.name !== 'auth'){
            self.$router.push({name: 'auth'})
        }
    })
}


// 获取组合名称
export function getPortName(self) {
    api.post('/v2/portfolio/', {port_code: self.portCode}).then(resp=>{
        self.portName = resp.data.port_name
        self.name = resp.data.name
        self.launchDate = moment(resp.data.launch_date).format('LL')
    }).catch(e=>{
        if ([401, 402, 403].includes(e.response.status)){
            self.$router.push({name: 'auth'})
        }
    })
}