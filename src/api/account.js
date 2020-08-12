import {api} from "./base"

 // 获取单只基金的交易流水
export function getTransaction(self, fund) {
    self.transaction = []
    api.post('/v2/portfolio/asset/category', {port_code: self.port_code, fund: fund, date: self.selectedDate}).then(resp=>{
        self.transaction = resp.data
        self.showTrans = true
    })
}
