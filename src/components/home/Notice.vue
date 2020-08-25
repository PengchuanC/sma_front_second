<template>
<div class="notice">
  <p class="card-header">公告</p>
  <div class="content">
    <div class="logo">
      <img src="../../assets/images/notice.svg" alt="" class="image"/>
    </div>
    <div class="notice-item-wrapper" v-for="(n, i) in data" :key="i">
      <a @click="openNotice(n.url)" class="link">
        <p><i class="date">{{moment(n.date)}}</i>{{n.title}}</p>
      </a>
    </div>
  </div>
</div>
</template>

<script>
import {api} from "@/api/base"
import moment from 'moment'
import 'moment/locale/zh-cn'

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
    },
    moment(date){
      return moment(date).format('LL')
    },
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