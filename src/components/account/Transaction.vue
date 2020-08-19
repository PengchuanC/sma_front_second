<template>
  <div id="transaction">
    <table>
      <tr class="category">
        <th class="first"></th>
        <th>基金代码</th>
        <th>基金名称</th>
        <th>持有份额</th>
        <th>持有成本（元）</th>
        <th>当前净值</th>
        <th>持仓收益（元）</th>
        <th>资金占比</th>
      </tr>
      <tr class="funds">
        <td class="first"></td>
        <td>{{row.category}}</td>
        <td>{{row.secuname}}</td>
        <td>{{numeral(row.shares)}}</td>
        <td>{{numeral(row.cost)}}</td>
        <td>{{row.net_value}}</td>
        <td>{{numeral(row.profit)}}</td>
        <td>{{numeral(row.ratio)}}%</td>
      </tr>
      <tr class="header">
        <th class="first"></th>
        <th></th>
        <th></th>
        <th>交易类型</th>
        <th>交易规模</th>
        <th>交易日期</th>
        <th>交易价格（元）</th>
        <th>手续费（元）</th>
      </tr>
      <tr class="funds" v-for="(r, i) in data" :key="'tr'+i">
        <td class="first"></td>
        <td>{{row.category}}</td>
        <td>{{row.secuname}}</td>
        <td>{{r.operation}}</td>
        <td>{{numeral(r.amount)}}{{r.operation==='申购'?'元':'份'}}</td>
        <td>{{r.date}}</td>
        <td>{{r.price.toFixed(4)}}</td>
        <td>{{numeral(r.fee)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import numeral from 'numeral'

export default {
  name: "Transaction",
  props: {
    data: Array,
    row: Object
  },
  data() {
    return {
    }
  },
  methods: {
    numeral(value){
      return numeral(value).format('0,00.00')
    }
  },
  created() {
    console.log(this.data)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/account";
table {
  width: 100%;
  border-collapse: collapse;
}

tr[class='category'] {
  border: 2px none white;
  border-bottom-style: solid;
  line-height: 36px;
  background-color: #D18484;
  color:white;
}

tr[class='header'] {
  border: none;
  line-height: 26px;
  background-color: #A6A6A6;
  color:white;
}

tr[class='funds'] {
  cursor: pointer;
}

td {
  text-align: center;
  line-height: 30px;
}

th[class='first'] {
  width: 5px;
  border-right: white 3px solid;
  background-color: lightgrey
}
</style>