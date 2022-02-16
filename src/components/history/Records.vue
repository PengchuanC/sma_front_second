<template>
  <div class="records">
    <div class="records-card-header">
      <div class="date-picker">
        <date-picker
            class="picker"
            :value="selectedDates"
            format="yyyy-MM-dd"
            type="daterange"
            placement="bottom-end"
            placeholder="选择区间"
            size="small"
            @on-change="changeDate"
            style="width: 200px"
        >
        </date-picker>
      </div>
    </div>
    <div class="records-content">
      <table v-if="data.length > 0">
        <tr class="header">
          <th>序号</th>
          <th>发生日期</th>
          <th>基金代码</th>
          <th class="left">基金名称</th>
          <th>交易类型</th>
          <th style="text-align: right;">金额(元)</th>
          <th style="text-align: right;">份额(份)</th>
          <th style="width: 50px"></th>
        </tr>
        <tr v-for="(r, i) in data" :key="'records'+i">
          <td>{{r.id}}</td>
          <td>{{r.date}}</td>
          <td>{{r.secucode}}</td>
          <td class="left">{{r.secuname}}</td>
          <td>{{r.operation}}</td>
          <td style="text-align: right;">{{r.flag===1? numeral(r.amount): '-'}}</td>
          <td style="text-align: right;">{{r.flag!==1? numeral(r.amount): '-'}}</td>
          <td style="width: 50px"></td>
        </tr>
      </table>
      <div class="no-data" v-else>
          暂无交易记录
      </div>
    </div>
  </div>
</template>

<script>
import {DatePicker} from 'view-design'
import moment from 'moment'
import numeral from 'numeral'
import { transHistory } from "@/api/requests";
import LocalStorage from "@/common/localstorage";

export default {
  name: "Records",
  components: {DatePicker},
  data() {
    return {
      selectedDates: [null, moment().format('YYYY-MM-DD')],
      data: []
    }
  },
  methods: {
    changeDate(value){
      this.selectedDates = value
      this.records()
    },
    numeral(value){
      return numeral(value).format('0,00.00')
    },
    records(){
      const port_code = LocalStorage.getPortCode()
      const [start, end] = this.selectedDates
      const req = transHistory(port_code, start, end)
      req.then(r => {
        const data = r.data
        if (data.length === 0) {
          return
        }
        let start = data[0].date
        let end = data[data.length-1].date
        this.selectedDates = [start, end]
        this.data = data
      }).catch(err=>{
        this.$Notice.error({title: '交易记录查询失败', desc: err.data.msg, duration: 5})
      })
    }
  },
  created() {
    this.records()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/records";
</style>