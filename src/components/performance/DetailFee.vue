<template>
  <div>
    <p>单位：元</p>
    <table>
      <tr class="header">
        <th>序号</th>
        <th>基金代码</th>
        <th align="left">基金简称</th>
        <th align="right">最新市值</th>
        <th align="right">交易费</th>
        <th align="right">管理费</th>
        <th align="right">托管费</th>
        <th align="right">审计费</th>
        <th align="right">开户费</th>
      </tr>
      <tr :class="!r.id?'active':'row'" v-for="(r, i) in data.ret" :key="'cate' + i">
        <td>{{r.id}}</td>
        <td>{{ r.secucode }}</td>
        <td align="left">{{r.name}}</td>
        <td align="right">{{numeral(r.cap)}}</td>
        <td align="right">{{numeral(r.trade)}}</td>
        <td align="right">{{numeral(r.management)}}</td>
        <td align="right">{{numeral(r.custodian)}}</td>
        <td align="right">{{numeral(r.audit)}}</td>
        <td align="right">{{numeral(r.other)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import numeral from "numeral"

export default {
  name: "DetailFee",
  props: {data: Object},
  methods: {
    numeral(value){
      numeral.zeroFormat('')
      numeral.nullFormat('')
      return numeral(value).format('0,00.00')
    }
  }
}
</script>

<style scoped>
p {
  text-align: right;
  width: 98%;
  font-size: small;
  font-family: 'Arial', 'SourceHanSansCN', '思源宋体', 'Noto Serif CJK SC', 'Noto Serif CJK', 'Source Han Serif SC', 'Source Han Serif', source-han-serif-sc, '宋体', serif;
}

table {
  width: 98%;
  margin: auto;
  border-collapse: collapse;
  border: 1px lightgrey solid;
  font-family: 'Arial', 'SourceHanSansCN', '思源宋体', 'Noto Serif CJK SC', 'Noto Serif CJK', 'Source Han Serif SC', 'Source Han Serif', source-han-serif-sc, '宋体', serif;
}

tr[class='header'] {
  border: 2px none white;
  line-height: 36px;
  background-color: #C00000;
  color:white;
  font-size: 16px;
}

tr[class='row']{
  line-height: 20px;
}

tr[class='active']{
  line-height: 24px;
  font-size: 15px;
  background-color: rgba(115, 115, 115, 0.2);
}

td {
  text-align: center;
  line-height: 25px;
  font-size: 16px;
}

td[align='right'] {
  text-align: right;
  line-height: 25px;
  font-size: 16px;
}

td[align='left'] {
  text-align: left;
  line-height: 25px;
  font-size: 16px;
}
</style>