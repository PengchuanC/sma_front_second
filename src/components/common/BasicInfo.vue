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
import {getAllocate} from "@/api/home"
import moment from "moment"
import numeral from "numeral"

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
    }
  },
  created() {
    getAllocate(this)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/basicinfo.less";
</style>