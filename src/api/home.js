import {api} from "./base"
import moment from "moment";
import numeral from 'numeral'
import LocalStorage from "@/common/localstorage";

export function getNews(self) {
    api.get('/v2/news/').then(resp=>{
        self.newsList = resp.data
    })
}

// 获取收益资产配置数据
export function getAllocate(self) {
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
            self.selectedDate = data.date
            self.ratio = data.ratio
            self.ratio = data.ratio.map(x=>{
                return {
                    category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                    ratio: (x.ratio * 100).toFixed(2), children: [], _loading: false, id :x.id
                }
            })
            self.ret = data.ret
            self.net_asset = numeral(data.net_asset).format('0,0')
        } else {
            self.selectedDate = data.date
            self.ratio = []
            self.ret = null
            self.net_asset = null
        }
        self.fetched = true
    })
}


// 获取组合名称
export function getPortName(self) {
    api.post('/v2/portfolio/', {port_code: self.portCode}).then(resp=>{
        self.portName = resp.data.port_name
    })
}