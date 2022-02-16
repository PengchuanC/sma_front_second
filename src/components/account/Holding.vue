<template>
  <div id="holding-table">
    <HoldingTable :data="ratio" :date="selectedDate"></HoldingTable>
  </div>
</template>

<script>
  import LocalStorage from "@/common/localstorage"
  import HoldingTable from "@/components/account/HoldingTable"
  import {assetCategory} from "@/api/requests";

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
      let req = assetCategory(LocalStorage.getPortCode(), this.selectedDate)
      req.then(resp=>{
        this.ratio = resp.map(x=> {x.show=false; return x})
      }).catch(()=>{
        this.$Notice.error({title: "数据获取错误", desc: "认证信息已过期，请重新登陆"})
      })
    },
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>