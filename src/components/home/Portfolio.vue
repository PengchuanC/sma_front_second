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
    <div class="asset-chart">
      <div class="allocate-chart" id="chart"></div>
    </div>
    <div class="asset-table">
      <AssetTable :data="ratio" />
    </div>
  </div>
</template>

<script>

import {DatePicker} from 'view-design'
import {getAllocate, getPortName} from "@/api/home"
import moment from 'moment'
import LocalStorage from "@/common/localstorage";
import AssetTable from "@/components/common/AssetTable";

export default {
  name: "Portfolio",
  components: {AssetTable, DatePicker},
  data(){
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      portCode: LocalStorage.getPortCode(),
      portName: '野村东方平衡型策略1号',
      ratio: [],
      ret: 0,
      net_asset: 0,
      color: ['#900000','#C00000', '#D18484', '#E0B5B5', '#A6A6A6'],
      fetched: false
    }
  },
  methods: {
    changeDate(){
      getAllocate(this)
    },
    drawChart(){
      if (!this.ratio){
        return
      }
      let myChart = this.$chart.init(document.getElementById('chart'))
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {d}%'
        },
        title: {
          text: '{a|' + this.net_asset + '}{b|RMB}\n{c|' + this.ret*100+ '%}{b|成立以来}',
          top:'center',
          left: 'center',
          textStyle: {
            rich: {
              a: {
                color: '#C00000',
                padding: [5, 10],
                fontSize: 18,
                fontWeight: 'bold',
              },
              b: {
                fontSize: 14,
                fontWeight: 'bold',
              },
              c: {
                color: this.ret >= 0 ?'#C00000': 'green',
                padding: [0, 10],
                fontSize: 18,
                fontWeight: 'bold',
              },
            }
          }
        },
        color: this.color,
        series: [
          {
            name: '投资比例',
            type: 'pie',
            radius: ['60%', '90%'],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false
            },
            data: this.ratio.map(x=>{
                return {name: x.category, value: x.ratio}
            })
          }
        ]
      }
      myChart.setOption(options)
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  },
  mounted() {
    getPortName(this)
    getAllocate(this)
  },
  watch: {
    ratio: function (){
      this.drawChart()
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/portfolio";
</style>