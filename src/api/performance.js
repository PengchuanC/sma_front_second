import {api} from "@/api/base";

// 获取组合重要时间节点
export function getDate(self){
    api.get('/v2/portfolio/date/', {
        params: {port_code: self.port_code}
    }).then(r => {
        let data = r.data
        self.selectedDates = [data.launch, data.latest]
    }).catch(()=>{
        if (self.$route.name !== 'login'){
            self.$router.push({name: 'login'})
        }
    })
}