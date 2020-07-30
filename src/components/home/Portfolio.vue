<template>
  <div class="portfolio">
    <div class="card-header">
      <div class="flex">
        <p class="title">组合</p>
        <date-picker
            class="date-picker"
            size="small"
            placeholder="选择日期"
            :value="selectedDate">
        </date-picker>
      </div>
    </div>
    <div class="port-info">
      <h4>{{portCode}}</h4>
      <h4>{{portName}}</h4>
    </div>
  </div>
</template>

<script>

import {DatePicker} from 'view-design'

export default {
  name: "Portfolio",
  components: {DatePicker},
  data(){
    return {
      selectedDate: '2020-07-28',
      portCode: '999991',
      portName: '野村东方平衡型策略1号'
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/portfolio";
</style>