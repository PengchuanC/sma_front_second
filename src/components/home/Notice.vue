<template>
<div class="notice">
  <p class="card-header">公告</p>
  <div class="content">
    <div class="logo">
      <img src="../../assets/images/notice.svg" alt="" class="image"/>
    </div>
    <div class="notice-item-wrapper" v-for="(n, i) in data" :key="i">
      <a @click="openNotice(n.url)" class="link">
        <p><i class="date">{{n.date}}</i>《{{n.title}}》</p>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import {api} from "@/api/base";

export default {
  name: "notice",
  data(){
    return {
      data: []
    }
  },
  methods: {
    openNotice(link){
      window.open(link)
    }
  },
  created() {
    api.get('/v2/notifies/').then(r=>{
      this.data = r.data
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/notice";
</style>