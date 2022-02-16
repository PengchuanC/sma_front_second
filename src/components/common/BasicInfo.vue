<template>
  <div class="basic-info-wrapper">
    <div class="port-info">
      <p>组合资产净值</p>
      <p>{{ net_asset }} 元</p>
    </div>
    <div class="port-info">
      <div :class="ret>=0?'triangle-up':'triangle-down'"></div>
      <p class="change" :color="ret>=0?'red':'green'">{{ (ret * 100).toFixed(2) }}%</p>
      <p>{{ numeral(profit) }} 元</p>
      <p>成立以来</p>
    </div>
    <p class="date">{{ selectedDate }}</p>
  </div>
</template>

<script>
import moment from "moment"
import numeral from "numeral"
import {assetAllocate} from "@/api/requests";
import LocalStorage from "@/common/localstorage";

export default {
  name: "BasicInfo",
  data() {
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      ret: 0,
      net_asset: 0,
      profit: 0,
    }
  },
  methods: {
    numeral(value) {
      return numeral(value).format('0,00.00')
    },
    getAllocate(modifyDate=true) {
      numeral.zeroFormat('0.00')
      numeral.nullFormat('0.00')
      this.fetched = false
      let date;
      if (this.selectedDate) {
        date = moment(this.selectedDate).format('YYYY-MM-DD')
      }
      assetAllocate(LocalStorage.getPortCode(), date).then(resp=>{
        let data = resp
        if (data) {
          this.selectedDate = modifyDate? data.date: this.selectedDate
          this.ratio = data.ratio
          this.profit = data.profit
          this.ratio = data.ratio.map(x=>{
            if (x.category !== '现金') {
              return {
                category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                ratio: (x.ratio * 100).toFixed(2), children: [], _loading: false, id :x.id
              }
            }
            return {
              category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
              ratio: (x.ratio * 100).toFixed(2)
            }
          })
          this.ret = data.ret
          this.net_asset = numeral(data.net_asset).format('0,0')
        } else {
          this.selectedDate = modifyDate? data.date: this.selectedDate
          this.ratio = []
          this.ret = null
          this.net_asset = null
        }
        this.fetched = true
      })
    },
  },
  created() {
    this.getAllocate()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/basicinfo.less";
</style>