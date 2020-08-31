<template>
  <div class="reports-child">
    <div class="reports-child-card-header">
      <div class="reports-tab" v-show="showTab">
        <a tab :class="activeId===i?'tab-item tab-active':'tab-item'"
           v-for="(t, i) in tabs" :key="'rtb'+i"
           @click="selectTab(i)"
        >{{t}}</a>
      </div>
      <a class="close-icon" @click="close">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconclose"></use>
        </svg>
      </a>
    </div>
    <div class="reports-child-content" @scroll="scroll($event)">
      <sui-loader active v-if="loading" />
      <div class="reports-list" v-else>
        <div class="news-item" v-for="(news, i) in renderData" :key="'ren'+i">
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
          <div class="news-wrapper-no-image" v-else>
            <div class="pdf-cover">
              <svg class="font-icon pdf" aria-hidden="true">
                <use xlink:href="#iconpdf"></use>
              </svg>
            </div>
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
  </div>
</template>

<script>
import {api} from "@/api/base"
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  name: "ReportsChild",
  data(){
    return {
      activeId: 0,
      page: 0,
      loading: true,
      showTab: false,
      tabs: ['产品周报', '产品月报'],
      reports: {},
      renderData: [],
    }
  },
  methods: {
    close(){
      this.$router.history.go(-1)
    },
    selectTab(i){
      this.activeId = i
      let name = this.tabs[i]
      this.getReportsByType(name)
    },
    getReports(){
      api.get('/v2/reports/advance/').then(r=>{
        let data = r.data
        this.tabs = data.category
        this.reports = data.reports
        this.showTab = true
        this.selectTab(0)
      })
    },
    getReportsByType(type){
      this.loading = true
      api.post('/v2/reports/advance/', {category: type, page: this.page}).then(r=>{
        this.renderData = r.data
        this.loading = false
      })
    },
    openReport(link){window.open(link)},
    moment(date){
      return moment(date).format('LL')
    },
    scroll(e){
      let bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      if (bottom <= 40 && !this.loading){
        let type = this.tabs[this.activeId]
        this.page ++
        api.post('/v2/reports/advance/', {category: type, page: this.page}).then(r=>{
          if (r.data){
            this.renderData = r.data
          }
          this.loading = false
        })
      }
    },
    loadMore(){
      let type = this.tabs[this.activeId]
      this.page ++
      this.getReportsByType(type)
      console.log(this.page)
    }
  },
  created() {
    this.getReports()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/reports-child";
</style>