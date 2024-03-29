<template>
  <div class="performance-bar">
    <div class="performance-tools">
      <div class="choice">
        <sui-button-group size="mini">
          <sui-button @click="selectPeriod(i)" v-for="(b, i) in buttons" :key="'pbb'+i">{{ b }}</sui-button>
        </sui-button-group>
      </div>
      <div class="frequency">
        <sui-form>
          <sui-form-fields inline>
            <sui-form-field>
              <sui-checkbox label="周" radio value="0" v-model="freq"/>
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox label="月" radio value="1" v-model="freq"/>
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox label="半年" radio value="2" v-model="freq"/>
            </sui-form-field>
            <sui-form-field>
              <sui-checkbox label="年" radio value="3" v-model="freq"/>
            </sui-form-field>
          </sui-form-fields>
        </sui-form>
      </div>
    </div>
    <div v-if="finished">
      <div id="performance-bar-chart"></div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/base"
import LocalStorage from "@/common/localstorage"
import moment from 'moment'

export default {
  name: "PerformanceBar",
  props: {date: Array},
  data() {
    return {
      buttons: ['自定义', '本月至今', '本年至今', '最近三年', '成立以来'],
      freq: '1',
      period: 4,
      data: [],
      finished: false
    }
  },
  methods: {
    selectPeriod(i) {
      this.period = i
      api.get('/v2/portfolio/performance/bar/', {
        params: {
          port_code: LocalStorage.getPortCode(), beginDate: this.date[0],
          endDate: this.date[1], period: i, freq: this.freq
        }
      }).then(resp => {
        this.data = resp.data;
        this.finished = true;
        this.drawChart()
      })
    },
    drawChart() {
      let chart = this.$chart.init(document.getElementById('performance-bar-chart'))
      let options = {
        legend: {
          show: true,
          icon: 'line',
          top: 0
        },
        textStyle: {
          fontFamily: ['Arial', '宋体', 'kaiti SC', 'Kaiti'],
          fontSize: 16
        },
        grid: {
          left: 20,
          right: 60,
          bottom: 30,
          top: 50,
          containLabel: true
        },
        color: ['#CB2220', '#A6A6A6'],
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
          data: this.data.map(x => {
            console.log(this.freq)
            return this.freq !=='0' ?moment(x.date).format('YYYY-MM'):moment(x.date).format('YYYY-MM-DD')
          }),
          splitLine: {
            show: false
          },
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: 'grey'
            }
          },
          axisLabel: {
            textStyle: {
              fontSize: 14
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            scale: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: (value) => {
                return value.toFixed(4)
              },
              textStyle: {
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: 'grey'
              }
            },
          },
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: (value) => {
                return value.toFixed(2) + '%'
              },
              textStyle: {
                fontSize: 14
              }
            },
            axisLine: {
              lineStyle: {
                color: 'grey'
              }
            },
          }
        ],
        series: [
          {
            name: '累计净值',
            type: 'line',
            data: this.data.map(x => {
              return x.nav
            }),
            label: {
              show: false,
              position: 'right',
              formatter: '{c}',
              color: 'grey'
            },
          },
          {
            name: '涨跌幅(右)',
            type: 'bar',
            barWidth: '25%',
            data: this.data.map(x=>{return (x.pct*100).toFixed(2)}),
            axisLine:{
              lineStyle:{
                color:'#A6A6A6'
              }
            },
            yAxisIndex: 1,
            label: {
              show: false,
              // position: 'top',
              formatter: '{c}%',
              color: 'white',
              padding: [30, 0, 0, 0]
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
    this.selectPeriod(1)
    setTimeout(()=>{
      this.selectPeriod(4)
    }, 1000)
  },
  watch:{
    freq: function (){
      this.selectPeriod(this.period)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance";
</style>
