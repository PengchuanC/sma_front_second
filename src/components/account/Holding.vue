<template>
  <div id="holding-table">
    <HoldingTable :data="ratio" :date="selectedDate"></HoldingTable>
  </div>
</template>

<script>
  import {api} from '@/api/base'
  import LocalStorage from "@/common/localstorage"
  import HoldingTable from "@/components/account/HoldingTable"

  export default {
    name: "Holding",
    components: {HoldingTable},
    props: {
      selectedDate: String
    },
    data(){
      return {
        ratio: [],
        showTrans: false,
        height: 600,
      }
    },
    methods: {
      getHeight() {
        let div = document.getElementById('holding-table')
        return div.clientHeight
      }
    },
    mounted() {
      this.height = this.getHeight()
      api.get('/v2/portfolio/asset/category/', {
        params:{port_code: LocalStorage.getPortCode(), date: this.selectedDate}
      }).then(resp=>{
        this.ratio = resp.data.map(x=> {x.show=false; return x})
      })
    },
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>