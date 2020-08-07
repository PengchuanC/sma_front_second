<template>
  <div>
    <Table
        size="small" stripe border row-key="id"
        :columns="columns"
        :data="ratio"
        :load-data="asyncLoadData"
    >
    </Table>
  </div>
</template>

<script>
  import {Table} from 'view-design'
  import {getAllocate} from "@/api/home";
  import {api} from '@/api/base'
  import LocalStorage from "@/common/localstorage";

  export default {
    name: "Holding",
    components: {Table},
    props: {
      selectedDate: String
    },
    data(){
      return {
        columns: [
          {
            title: '基金代码',
            key: 'category',
            tree: true
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
        ratio: []
      }
    },
    methods: {
      asyncLoadData(item, callback){
        let category = item.category
        api.get('/v2/portfolio/asset/category', {
          params: {
            port_code: LocalStorage.getPortCode(), date: this.selectedDate, category: category
          }
        }).then(resp=>{
          let data = resp.data
          callback(data)
        })
      }
    },
    mounted() {
      getAllocate(this)
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>