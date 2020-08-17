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
      <table>
        <tr class="header">
          <th>序号</th>
          <th>发生日期</th>
          <th>基金代码</th>
          <th>基金名称</th>
          <th>交易类型</th>
          <th>买入金额(元)</th>
          <th>卖出份额(份)</th>
        </tr>
        <tr v-for="(r, i) in data" :key="'records'+i">
          <td>{{r.id}}</td>
          <td>{{r.date}}</td>
          <td>{{r.secucode}}</td>
          <td>{{r.secuname}}</td>
          <td>{{r.operation}}</td>
          <td>{{r.operation==='买入'? numeral(r.amount): '-'}}</td>
          <td>{{r.operation!=='买入'? numeral(r.amount): '-'}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {DatePicker} from 'view-design'
import moment from 'moment'
import numeral from 'numeral'
import {getRecords} from "@/api/records"

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
      getRecords(this)
    },
    numeral(value){
      return numeral(value).format('0,00.00')
    }
  },
  created() {
    getRecords(this)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/records";
</style>