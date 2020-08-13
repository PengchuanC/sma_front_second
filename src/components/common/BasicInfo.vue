<template>
  <div class="basic-info-wrapper">
    <div class="port-info">
      <div :class="ret>0?'triangle-up':'triangle-down'"></div>
      <p class="change" :color="ret>0?'red':'green'">{{ret*100}}%</p>
      <p>成立以来</p>
      <p>{{ net_asset }} RMB</p>
    </div>
    <p class="date">2020-08-04</p>
  </div>
</template>

<script>
import {getAllocate} from "@/api/home";
import moment from "moment";

export default {
  name: "BasicInfo",
  data(){
    return {
      selectedDate: moment().format('YYYY-MM-DD'),
      ret: 0,
      net_asset: 0,
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