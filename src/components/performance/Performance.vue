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
            format="yyyy-MM-dd"
            type="daterange"
            placement="bottom-end"
            placeholder="选择区间"
            size="small"
            @on-change="changeDate"
        >
        </date-picker>
      </div>
    </div>
    <PerformanceTable :data="data" v-show="activeId===1" />
    <PerformanceBar :date="selectedDates" v-show="activeId===2"/>
    <PerformanceLine :date="selectedDates" v-show="activeId===3" />
  </div>
</template>

<script>
import {DatePicker} from 'view-design'
import PerformanceTable from "@/components/performance/PerformanceTable";
import PerformanceBar from "@/components/performance/PerformanceBar";
import PerformanceLine from "@/components/performance/PerformanceLine";
import LocalStorage from "@/common/localstorage";
import {getDate} from "@/api/performance";
import {api} from "@/api/base";

export default {
  name: "Performance",
  components: {PerformanceLine, PerformanceBar, PerformanceTable, DatePicker},
  data(){
    return {
      activeId: 1,
      selectedDates: ['2020-04-13', '2020-07-28'],
      port_code: LocalStorage.getPortCode(),
      data: []
    }
  },
  methods:{
    selectIcon(i){
      this.activeId = i;
    },
    changeDate(value){
      this.selectedDates = value
    }
  },
  created() {
    getDate(this)
    api.get('/v2/portfolio/performance/table/', {
      params: {port_code: 'FF9009', beginDate: this.selectedDates[0], endDatec: this.selectedDates[1]}
    }).then(r=>{
      this.data = r.data
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance.less";
</style>