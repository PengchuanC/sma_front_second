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