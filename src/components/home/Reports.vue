<template>
  <div class="reports">
    <p class="card-header">专栏</p>
    <div class="content">
      <div class="logo">
        <img class="image" src="../../assets/images/reports.svg" alt="" />
      </div>
      <div class="news-item" v-for="(news, i) in reports" :key="i">
        <a @click="openReport(news.url)" class="link">
          <p class="title">{{news.title}}</p>
          <div class="source-info">
            <p class="media">{{news.category}}</p>
            <p>{{moment(news.date)}}</p>
          </div>
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
  name: "Reports",
  data(){
    return {
      reports: [
        {title: '5月债市巨震， 股市成长风格占优', category: '产品月报', date: '2020-06-01', url: ''},
      ]
    }
  },
  methods: {
    openReport(link){
      window.open(link)
    },
    moment(date){
      return moment(date).format('LL')
    },
  },
  created() {
    api.get('/v2/reports/').then(r=>{
      this.reports = r.data
    })
  }
}
</script>

<style scoped lang="less">
@import '../../assets/style/reports.less';
</style>