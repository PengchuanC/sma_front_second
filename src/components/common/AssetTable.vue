<template>
  <div class="asset-table">
    <table border="0">
      <tr>
        <th>资产类别</th>
        <th style="text-align: right">投资比例（%）</th>
        <th style="text-align: right">资产净值（元）</th>
      </tr>
      <tr v-for="(row, i) in data" :key="'at'+i">
        <td>
          <div class="box-wrapper">
            <div class="box" :style="{backgroundColor: color[i]}"></div>
            <p>{{row.category}}</p>
          </div>
        </td>
        <td style="text-align: right; padding-right: 20px">{{row.ratio}}</td>
        <td style="text-align: right; padding-right: 20px">{{row.mkt?row.mkt:'0.00'}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {chartColor} from "@/common/variables";

export default {
  name: "AssetTable",
  props: {data: Array},
  data() {
    return {
      color: chartColor
    }
  }
}
</script>

<style scoped lang="less">
.asset-table {
  height: 100%;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  border: 2px none lightgrey;
  border-bottom-style: solid;
  line-height: 36px;
  font-size: 16px;
}

td {
  border: 1px none lightgrey;
  border-bottom-style: solid;
  text-align: center;
  line-height: 28px;
  font-size: 16px;
}

p {
  display: flex;
  line-height: 28px
}

.box-wrapper {
  display: inline-flex;
  align-content: center
}

.box {
  margin: auto 5px auto auto;
  width: 5px;
  height: 16px;
  line-height: 28px;
  float: left;
}
</style>