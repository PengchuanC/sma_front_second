<template>
  <div class="account-chart" id="account-chart"></div>
</template>

<script>
import {chartColor} from "@/common/variables";

export default {
    name: "AccountChart",
    props: {
      ratio: Array
    },
    methods: {
      drawChart(){
        let chart = this.$chart.init(document.getElementById('account-chart'))
        let options = {
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 20,
            containLabel: true
          },
          color: chartColor,
          xAxis: [
            {
              type: 'category',
              data: this.ratio.map(e=>{return e.category}),
              axisTick: {
                alignWithLabel: true
              },
              splitLine: false,
              axisLine:{
                lineStyle:{
                }
              },
              axisLabel: {
                textStyle: {
                  fontSize: 14
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: false,
              axisLine:{
                lineStyle:{
                }
              },
              axisLabel: {
                formatter: (value)=>{
                  return value+'%'
                },
                textStyle: {
                  fontSize: 14
                }
              }
            }
          ],
          series: [
            {
              name: '配置比例',
              type: 'bar',
              barWidth: '25%',
              data: this.ratio.map((e)=>{return e.ratio}),
              itemStyle: {
                normal: {
                  color: (x)=>{
                    return chartColor[x.dataIndex]
                  },
                }
              },
              label: {
                show: true,
                position: 'top',
                formatter: '{c}%',
                color: 'black',
                fontSize: 14
              },
            }
          ]
        }
        chart.setOption(options)
        window.addEventListener("resize", () => {
          chart.resize();
        });
      }
    },
    mounted() {
      this.drawChart()
    },
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>