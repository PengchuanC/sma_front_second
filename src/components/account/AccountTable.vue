<template>
  <div class="account-table">
      <sui-table striped>
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
</template>

<script>
  import {chartColor} from "@/common/variables";

  export default {
    name: "AccountTable",
    props: {
      ratio: Array
    },
    data(){
      return {
        color: chartColor
      }
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>