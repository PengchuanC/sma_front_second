<template>
  <div class="reports">
    <div class="card-header">
      <p class="header-title">专栏</p>
      <a class="icon-item header-icon" @click="showMore">
        <svg class="font-icon more" aria-hidden="true">
          <use xlink:href="#iconmore2"></use>
        </svg>
      </a>
    </div>
    <div class="content">
      <div class="news-item" v-for="(news, i) in reports" :key="i">
        <div class="news-wrapper" v-if="!!news.image">
          <div class="report-cover">
            <img :src="news.image" alt="" class="cover">
          </div>
          <a @click="openReport(news.url)" class="report-link">
            <p class="title">{{news.title}}</p>
            <div class="source-info">
              <p class="media">{{news.category}}</p>
              <p>{{moment(news.date)}}</p>
            </div>
          </a>
        </div>
        <div v-else>
          <a @click="openReport(news.url)" class="link-no-img">
            <p class="title">{{news.title}}</p>
            <div class="source-info">
              <p class="media">{{news.category}}</p>
              <p>{{moment(news.date)}}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/base"
import moment from 'moment'
import 'moment/locale/zh-cn'
import LocalStorage from "@/common/localstorage";

export default {
  name: "Reports",
  data(){
    return {
      port_code: LocalStorage.getPortCode(),
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
    showMore(){
      this.$router.push({name: 'reports'})
    }
  },
  created() {
    api.get('/v2/reports/', {params: {port_code: this.port_code}}).then(r=>{
      this.reports = r.data
    })
  }
}
</script>

<style scoped lang="less">
@import '../../assets/style/reports.less';
</style>