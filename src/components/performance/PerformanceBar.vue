<template>
  <div class="performance-bar">
    <div class="choice">
      <sui-button-group size="mini">
        <sui-button @click="selectPeriod(i)" v-for="(b, i) in buttons" :key="'pbb'+i">{{b}}</sui-button>
      </sui-button-group>
    </div>
    <div id="performance-bar-chart"></div>
  </div>
</template>

<script>
export default {
  name: "PerformanceBar",
  data(){
    return {
      buttons: ['自定义', '本月至今', '本年至今', '最近三年', '成立以来']
    }
  },
  methods: {
    selectPeriod(i){
      console.log(i)
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/performance";
</style>