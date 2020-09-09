import {api} from "./base"
import LocalStorage from "@/common/localstorage"


// 获取交易记录
export function getRecords(self) {
    let portCode = LocalStorage.getPortCode()
    api.get('/v2/portfolio/records/', {
        params: {port_code: portCode, startDate: self.selectedDates[0], endDate: self.selectedDates[1]}
    }).then(r => {
        let data = r.data
        if (data.length === 0) {
            return
        }
        let start = data[0].date
        let end = data[data.length-1].date
        self.selectedDates = [start, end]
        self.data = data
    }).catch(()=>{
        alert(1)
        if (self.$route.name !== 'login'){
            self.$router.push({name: 'login'})
        }
    })
}