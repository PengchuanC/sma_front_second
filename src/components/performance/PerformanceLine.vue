<template>
  <div class="performance-line">
    <div class="choice">
      <sui-button-group size="mini">
        <sui-button @click="selectPeriod(i)" v-for="(b, i) in buttons" :key="'plb'+i">{{b}}</sui-button>
      </sui-button-group>
    </div>
    <div id="performance-line-chart"></div>
  </div>
</template>

<script>
import {api} from "@/api/base";
import LocalStorage from "@/common/localstorage";

export default {
  name: "PerformanceLine",
  props: {date: Array},
  data(){
    return {
      buttons: ['自定义', '本月至今', '本年至今', '最近三年', '成立以来'],
      data: [],
    }
  },
  methods: {
    selectPeriod(i){
      api.get('/v2/portfolio/performance/line/',{
        params: {port_code: LocalStorage.getPortCode(), beginDate: this.date[0], endDate: this.date[1], period: i}
      }).then(resp=>{this.data = resp.data; this.drawChart()})
    },
    drawChart(){
      let chart = this.$chart.init(document.getElementById('performance-line-chart'))
      let options = {
        legend : {
          show : true,
          icon: 'line',
          top: 0
        },
        textStyle: {
          fontFamily: ['Arial', '思源宋体', 'kaiti SC', 'Kaiti'],
          fontSize: 16
        },
        grid: {
          left : 20,
          right : 60,
          bottom : 30,
          top : 20,
          containLabel : true
        },
        color: ['#900000', '#A6A6A6'],
        tooltip: {
          trigger: 'item',
          backgroundColor: '#CB2220',
          axisPointer: {
            show: true,
            snap: true,
          },
        },
        xAxis: {
          type: 'category',
          data: this.data.portfolio.map(x=>{return x.date}),
          splitLine: {
            show: false
          },
          boundaryGap: false,
          axisLine:{
            lineStyle:{
              color:'grey'
            }
          },
        },
        yAxis: {
          type: 'value',
          scale: true,
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: (value)=>{
              return value.toFixed(2)
            }
          },
          axisLine:{
            lineStyle:{
              color:'grey'
            }
          },
        },
        series: [
          {
            name: '组合',
            type: 'line',
            data: this.data.portfolio.map(x=>{return x.nav}),
          },
          {
            name: '基准',
            type: 'line',
            data: this.data.benchmark.map(x=>{return x.nav}),
            axisLine:{
              lineStyle:{
                color:'#A6A6A6'
              }
            },
          }
        ]
      }
      chart.setOption(options)
      window.addEventListener("resize", () => {
        chart.resize();
      });
    },
  },
  created() {
    this.selectPeriod(4)
  },
  watch: {
    date: function (){
      this.selectPeriod(0)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance";
</style>