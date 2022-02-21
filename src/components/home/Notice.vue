<template>
<div class="notice">
  <p class="card-header">公告</p>
  <div class="content">
    <a class="icon-item content-icon">
      <svg class="font-icon" aria-hidden="true">
        <use xlink:href="#icongonggao"></use>
      </svg>
    </a>
    <div class="content-wrapper">
      <div class="link-no-img" v-for="(n, i) in data" :key="i">
        <a @click="openNotice(n.url)" class="link-no-img">
          <p class="title">{{n.title}}</p>
          <div class="source-info">
            <p class="media">{{moment(n.date)}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import {notifies} from "@/api/requests";
import LocalStorage from "@/common/localstorage";

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
    getNotifies(){
      const port_code = LocalStorage.getPortCode()
      let req =notifies(port_code)
      req.then(r=>{
        this.data = r.data
      })
    }
  },
  mounted() {
    this.getNotifies()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/notice";
</style>