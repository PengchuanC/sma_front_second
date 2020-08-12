<template>
  <div class="performance-table">
    <table>
      <tr class="header">
        <th>区间</th>
        <th>具体时间</th>
        <th>资产变动（元）</th>
        <th>业绩表现</th>
        <th></th>
      </tr>
      <tbody v-for="(t, i) in data" :key="'pt'+i">
      <tr :class="activeRow===i?'active': ''" @click="i !==activeRow?activeRow=i:activeRow=null">
        <td>{{t.name}}</td>
        <td>{{t.period[0]}}-{{t.period[1]}}</td>
        <td>{{t.change}}</td>
        <td>{{t.profit}}</td>
        <td class="arrow"><sui-icon style="color: grey" :name="activeRow===i?'angle down':'angle up'"/></td>
      </tr>
      <tr v-show="activeRow===i" class="row" v-for="(r, i2) in data[i].child" :key="'ptc'+i2">
        <td>{{r.name}}</td>
        <td></td>
        <td></td>
        <td>{{r.value}}</td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import numeral from 'numeral'
export default {
  name: "PerformanceTable",
  props: {data: Array},
  data(){
    return {
      activeRow: 1,
    }
  },
  methods: {
    numeral(value){
      return numeral(value).format('0,00.00')
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance";
</style>