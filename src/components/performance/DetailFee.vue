<template>
  <div>
    <table>
      <tr class="header">
        <th>序号</th>
        <th>基金代码</th>
        <th>基金简称</th>
        <th>最新持仓市值</th>
        <th>申购费</th>
        <th>赎回费</th>
        <th>管理费</th>
        <th>托管费</th>
        <th>审计费</th>
      </tr>
      <tr :class="!r.id?'active':'row'" v-for="(r, i) in data.ret" :key="'cate' + i">
        <td>{{r.id}}</td>
        <td>{{ r.secucode }}</td>
        <td>{{r.name}}</td>
        <td>{{numeral(r.cap)}}</td>
        <td>{{numeral(r.purchase)}}</td>
        <td>{{numeral(r.redemption)}}</td>
        <td>{{numeral(r.management)}}</td>
        <td>{{numeral(r.custodian)}}</td>
        <td>{{numeral(r.audit)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import numeral from "numeral"

numeral.zeroFormat('')
numeral.nullFormat('')

export default {
  name: "DetailFee",
  props: {data: Object},
  methods: {
    numeral(value){
      return numeral(value).format('0,00.00')
    }
  }
}
</script>

<style scoped>
table {
  width: 98%;
  margin: auto;
  border-collapse: collapse;
  border: 1px lightgrey solid;
}

tr[class='header'] {
  border: 2px none white;
  line-height: 36px;
  background-color: #C00000;
  color:white;
}

tr[class='row']{
  line-height: 20px;
}

tr[class='active']{
  font-size: small;
  background-color: rgba(115, 115, 115, 0.2);
}

td {
  text-align: center;
  line-height: 25px;
}
</style>