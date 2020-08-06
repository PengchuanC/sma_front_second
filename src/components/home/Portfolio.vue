<template>
  <div class="portfolio">
    <div class="card-header">
      <div class="flex">
        <p class="title">组合</p>
        <date-picker
            class="date-picker"
            size="small"
            placeholder="选择日期"
            v-model="selectedDate"
            @on-change="changeDate"
        >
        </date-picker>
      </div>
    </div>
    <div class="port-info">
      <h4>{{portCode}}</h4>
      <h4>{{portName}}</h4>
    </div>
    <div class="asset-table">
      <sui-table size="small">
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>资产类别</sui-table-header-cell>
            <sui-table-header-cell style="text-align: right; padding-right: 40px">投资比例</sui-table-header-cell>
            <sui-table-header-cell style="text-align: right; padding-right: 25px">投资金额（元）</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row v-for="(row, i) in ratio" :key="i">
            <sui-table-cell><span class="box" :style="{'background': color[i]}"></span>{{ row.category }}</sui-table-cell>
            <sui-table-cell style="text-align: right; padding-right: 50px">{{ (row.ratio*100).toFixed(2) }}%</sui-table-cell>
            <sui-table-cell style="text-align: right; padding-right: 50px">{{ row.mkt }}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </div>
  </div>
</template>

<script>

import {DatePicker} from 'view-design'
import {getAllocate} from "@/api/home"
import moment from 'moment'

export default {
  name: "Portfolio",
  components: {DatePicker},
  data(){
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      portCode: 'FF9009',
      portName: '野村东方平衡型策略1号',
      ratio: [],
      ret: 0,
      color: ['#900000','#C00000', '#D18484', '#E0B5B5', '#A6A6A6']
    }
  },
  methods: {
    changeDate(){
      getAllocate(this)
    }
  },
  mounted() {
    getAllocate(this)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/portfolio";
</style>