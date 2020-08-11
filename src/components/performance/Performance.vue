<template>
  <div class="performance">
    <div class="performance-header">
      <div class="icon">
        <div class="icon-item" @click="selectIcon(1)">
          <div class="image-wrapper">
            <svg class="font-icon image"  aria-hidden="true">
              <use xlink:href="#iconliebiao"  :class="activeId === 1? 'active': ''"></use>
            </svg>
          </div>
        </div>
        <div class="icon-item" @click="selectIcon(2)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconzhutu" :class="activeId === 2? 'active': ''"></use>
            </svg>
          </div>
        </div>
        <div class="icon-item" @click="selectIcon(3)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconlinechart" :class="activeId === 3? 'active': ''"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="date-picker">
        <date-picker
            class="picker"
            :value="selectedDates"
            format="yyyy/MM/dd"
            type="daterange"
            placement="bottom-end"
            placeholder="选择区间"
            size="small"
        >
        </date-picker>
      </div>
    </div>
    <PerformanceTable :data="data" v-show="activeId===1" />
    <PerformanceBar v-show="activeId===2"/>
    <PerformanceLine v-show="activeId===3" />
  </div>
</template>

<script>
import {DatePicker} from 'view-design'
import PerformanceTable from "@/components/performance/PerformanceTable";
import PerformanceBar from "@/components/performance/PerformanceBar";
import PerformanceLine from "@/components/performance/PerformanceLine";

export default {
  name: "Performance",
  components: {PerformanceLine, PerformanceBar, PerformanceTable, DatePicker},
  data(){
    return {
      activeId: 1,
      selectedDates: ['2020-04-13', '2020-07-28'],
      data: [
        {'name': '自定义', 'period': ['2020-04-13', '2020-08-04'], 'change': 1477.34, 'profit': 0.0030, child: [
            {name: '期初资产', value: 5000}, {name: '申购', value: 5000}, {name: '赎回', value: 5000},
            {name: '期末资产', value: 5000}, {name: '区间收益', value: 2.21}, {name: '分红', value: 5000},
            {name: '费用', value: 5000}
          ]},
        {'name': '本月至今', 'period': ['2020-04-13', '2020-08-04'], 'change': 1477.34, 'profit': 0.0030, child: [
            {name: '期初资产', value: 5000}, {name: '申购', value: 5000}, {name: '赎回', value: 5000},
            {name: '期末资产', value: 5000}, {name: '区间收益', value: 2.21}, {name: '分红', value: 5000},
            {name: '费用', value: 5000}
          ]},
        {'name': '自本年至今', 'period': ['2020-04-13', '2020-08-04'], 'change': 1477.34, 'profit': 0.0030, child: [
            {name: '期初资产', value: 5000}, {name: '申购', value: 5000}, {name: '赎回', value: 5000},
            {name: '期末资产', value: 5000}, {name: '区间收益', value: 2.21}, {name: '分红', value: 5000},
            {name: '费用', value: 5000}
          ]},
        {'name': '自最近三年', 'period': ['2020-04-13', '2020-08-04'], 'change': 1477.34, 'profit': 0.0030, child: [
            {name: '期初资产', value: 5000}, {name: '申购', value: 5000}, {name: '赎回', value: 5000},
            {name: '期末资产', value: 5000}, {name: '区间收益', value: 2.21}, {name: '分红', value: 5000},
            {name: '费用', value: 5000}
          ]},
        {'name': '成立以来', 'period': ['2020-04-13', '2020-08-04'], 'change': 1477.34, 'profit': 0.0030, child: [
            {name: '期初资产', value: 5000}, {name: '申购', value: 5000}, {name: '赎回', value: 5000},
            {name: '期末资产', value: 5000}, {name: '区间收益', value: 2.21}, {name: '分红', value: 5000},
            {name: '费用', value: 5000}
          ]},
      ]
    }
  },
  methods:{
    selectIcon(i){
      this.activeId = i;
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance.less";
</style>