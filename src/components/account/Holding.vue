<template>
  <div id="holding-table">
    <Table
        size="small" row-key="id"
        :max-height="height"
        :columns="columns"
        :data="ratio"
        :load-data="asyncLoadData"
        @on-row-click="selectRow"
    >
    </Table>
    <AssetTable :data="ratio"/>
    <Modal v-model="showTrans"
           title="交易流水"
           :width="80"
           :scrollable="true"
    >
      <Transaction :data="transaction" />
    </Modal>
  </div>
</template>

<script>
  import moment from 'moment'

  import {getAllocate} from "@/api/home";
  import {api} from '@/api/base'
  import LocalStorage from "@/common/localstorage";
  import Transaction from "@/components/account/Transaction";
  import {getTransaction} from "@/api/account";
  import AssetTable from "@/components/common/AssetTable";

  export default {
    name: "Holding",
    components: {AssetTable, Transaction},
    props: {
      selectedDate: String
    },
    data(){
      return {
        columns: [
          {
            title: '#',
            width: 60,
            tree: true
          },
          {
            title: '基金代码',
            key: 'category',
          },
          {
            title: '基金名称',
            key: 'secuname',
          },
          {
            title: '持有份额(份)',
            key: 'shares',
            align: 'center'
          },
          {
            title: '持有成本(元)',
            key: 'cost',
            align: 'center'
          },
          {
            title: '当前净值',
            key: 'net_value',
            align: 'center'
          },
          {
            title: '持仓收益(元)',
            key: 'profit',
            align: 'center'
          },
          {
            title: '资金占比(%)',
            key: 'ratio',
            align: 'center'
          },
        ],
        ratio: [],
        transaction: [],
        showTrans: false,
        height: 600
      }
    },
    methods: {
      asyncLoadData(item, callback){
        let category = item.category
        let date = moment(this.selectedDate).format('YYYY-MM-DD')
        api.get('/v2/portfolio/asset/category', {
          params: {
            port_code: LocalStorage.getPortCode(), date: date, category: category
          }
        }).then(resp=>{
          let data = resp.data
          callback(data)
        })
      },
      selectRow(item){
        if (!item.children) {
          this.port_code = LocalStorage.getPortCode()
          getTransaction(this, item.category)
        }
      },
      getHeight() {
        let div = document.getElementById('holding-table')
        return div.clientHeight
      }
    },
    mounted() {
      getAllocate(this, false)
      this.height = this.getHeight()
    },
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>