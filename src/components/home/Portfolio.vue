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
      <h3>{{name}}</h3>
      <h3>{{portName}}</h3>
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
import moment from 'moment'
import LocalStorage from "@/common/localstorage";
import AssetTable from "@/components/common/AssetTable";
import {assetAllocate, portfolioInfo} from "@/api/requests";
import numeral from "numeral";

export default {
  name: "Portfolio",
  components: {AssetTable, DatePicker},
  data(){
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      portCode: LocalStorage.getPortCode(),
      portName: '野村东方平衡型策略1号',
      name: '',
      ratio: [],
      ret: 0,
      net_asset: 0,
      color: ['#900000','#C00000', '#D18484', '#E0B5B5', '#A6A6A6'],
      fetched: false
    }
  },
  methods: {
    changeDate(){
      this.getAllocate(true)
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
          text: '{a|' + this.net_asset + '}{b|元}\n{c|' + (this.ret*100).toFixed(2)+ '%}{b|成立以来}',
          top:'center',
          left: 'center',
          textStyle: {
            rich: {
              a: {
                color: '#C00000',
                padding: [5, 10],
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: ['Arial', '思源宋体', '宋体', 'Times New Roman']
              },
              b: {
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: ['Arial', '思源宋体', '宋体', 'Times New Roman']
              },
              c: {
                color: this.ret >= 0 ?'#C00000': 'green',
                padding: [0, 10],
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: ['Arial', '思源宋体', '宋体', 'Times New Roman']
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
    },
    getAllocate(modifyDate=true) {
      numeral.zeroFormat('0.00')
      numeral.nullFormat('0.00')
      this.fetched = false
      let date;
      if (this.selectedDate) {
        date = moment(this.selectedDate).format('YYYY-MM-DD')
      }
      assetAllocate(LocalStorage.getPortCode(), date).then(resp=>{
        let data = resp
        if (data) {
          this.selectedDate = modifyDate? data.date: this.selectedDate
          this.ratio = data.ratio
          this.profit = data.profit
          this.ratio = data.ratio.map(x=>{
            if (x.category !== '现金') {
              return {
                category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                ratio: (x.ratio * 100).toFixed(2), children: [], _loading: false, id :x.id
              }
            }
            return {
              category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
              ratio: (x.ratio * 100).toFixed(2)
            }
          })
          this.ret = data.ret
          this.net_asset = numeral(data.net_asset).format('0,0')
        } else {
          this.selectedDate = modifyDate? data.date: this.selectedDate
          this.ratio = []
          this.ret = null
          this.net_asset = null
        }
        this.fetched = true
      })
    },
    getPortName() {
      let req = portfolioInfo(this.portCode)
      req.then(resp=>{
        this.portName = resp.port_name
        this.name = resp.name
        this.launchDate = moment(resp.launch_date).format('LL')
      })
    }
  },
  mounted() {
    this.getPortName()
    this.getAllocate()
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