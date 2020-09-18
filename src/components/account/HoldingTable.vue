<template>
  <div class="holding-table-child">
    <sui-button @click="openAll" content="全部展开" size="mini" icon="plus" class="button"/>
    <sui-button @click="closeAll" content="全部折叠" size="mini" icon="minus" class="button"/>
    <table>
      <tbody v-for="(r, i1) in data" :key="'ht'+i1" ref="ht">
        <tr class="category" @click="showRows(i1)">
          <th class="first"></th>
          <th>{{r.category}}</th>
          <th colspan="2">{{ (r.ratio*100).toFixed(2)}}%</th>
          <th colspan="4">{{numeral(r.mkt)}}元</th>
          <th class="arrow">
            <sui-icon
                name="angle up"
                v-show="r.category !== '现金' && r.child.length !== 0"/>
          </th>
        </tr>
        <tr class="header" v-show="r.show" v-if="r.child.length !== 0">
          <th class="first"></th>
          <th>基金代码</th>
          <th>基金名称</th>
          <th>持有份额</th>
          <th>持有成本（元）</th>
          <th>当前净值</th>
          <th>持仓收益（元）</th>
          <th>资金占比</th>
          <th></th>
        </tr>
        <tr class="funds" v-show="r.show" v-for="(r2, i2) in r.child" :key="'htc'+i2" @click="getTransactions(i1, i2)">
          <td class="first"></td>
          <td>{{r2.category}}</td>
          <td>{{r2.secuname}}</td>
          <td>{{numeral(r2.shares)}}</td>
          <td>{{numeral(r2.cost)}}</td>
          <td>{{numeral(r2.net_value)}}</td>
          <td>{{numeral(r2.profit)}}</td>
          <td>{{numeral(r2.ratio)}}%</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <Modal v-model="showTrans"
           title="交易流水"
           :width="80"
           :scrollable="true"
    >
      <Transaction :data="transaction" :row="row" />
    </Modal>
  </div>
</template>

<script>
import numeral from 'numeral'
import Transaction from "@/components/account/Transaction"
import {api} from "@/api/base"
import LocalStorage from "@/common/localstorage"

numeral.zeroFormat('0.00')
numeral.nullFormat('0.00')

export default {
  name: "HoldingTable",
  components: {Transaction},
  props: {
    data: Array, date: String
  },
  data(){
    return {
      showTrans: false,
      transaction: [],
      row: {},
    }
  },
  methods: {
    showRows(e){
      // 现金
      if (e === 4){
        return
      }
      if (this.$refs.ht[e].childNodes[1].style.display=== 'none') {
        this.$refs.ht[e].childNodes[0].lastChild.lastChild.className='angle down icon'
      } else {
        this.$refs.ht[e].childNodes[0].lastChild.lastChild.className='angle up icon'
      }
      this.data[e].show = !this.data[e].show
    },
    numeral(value){
      return numeral(value).format('0,0.00')
    },
    getTransactions(i1, i2){
      this.showTrans = true
      let fund = this.data[i1].child[i2].category
      this.row = this.data[i1].child[i2]
      api.post('/v2/portfolio/asset/category/', {
        port_code: LocalStorage.getPortCode(), date: this.date, fund: fund
      }).then(resp=>{
        this.transaction =resp.data
      })
    },
    closeAll(){
      this.$refs.ht.forEach(x=>{
        x.childNodes[0].lastChild.lastChild.className='angle up icon'
      })
      this.data.forEach(x=>{
        x.show = false
      })
    },
    openAll(){
      this.data.forEach(x=>{
        x.show = true
      })
      this.$refs.ht.forEach(x=>{
        x.childNodes[0].lastChild.lastChild.className='angle down icon'
      })
    }
  },
}
</script>

<style scoped lang="less">
.holding-table-child {
  height: 100%;
  overflow: auto;
}

.button {
  margin-bottom: 5px;
}

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
  line-height: 32px;
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

th[class='arrow'] {
  width: 40px;
}

th[class='arrow']:hover {
  transform: scale(1.5, 1.5);
  transition: all 0.2s linear;
}

</style>