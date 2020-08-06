import {api} from "./base"
import moment from "moment";

export function getNews(self) {
    api.get('/v2/news/').then(resp=>{
        self.newsList = resp.data
    })
}

export function getAllocate(self) {
    let date;
    if (self.selectedDate) {
        date = moment(self.selectedDate).format('YYYY-MM-DD')
    }
    api.get('/v2/portfolio/asset/', {
        params: {portCode: self.portCode, date: date}
    }).then(resp=>{
        let data = resp.data
        if (data) {
            self.selectedDate = data.date
            self.ratio = data.ratio
            self.ret = data.ret
        } else {
            self.selectedDate = data.date
            self.ratio = []
            self.ret = null
        }
    })
}
