<template>
  <div class="reports-child">
    <div class="reports-child-card-header">
      <div class="reports-tab" v-show="showTab">
        <h4>专栏文章</h4>
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
              <p class="title">
                <a class="hot-news content-icon" v-if="news.hot">
                  <svg class="font-icon" aria-hidden="true">
                    <use xlink:href="#iconhot"></use>
                  </svg>
                </a>
                {{news.title}}
              </p>
              <div class="source-info">
                <p class="media">{{news.category}}</p>
                <p>{{moment(news.date)}}</p>
              </div>
            </a>
          </div>
          <div class="news-wrapper-no-image" v-else>
            <a @click="openReport(news.url)" class="link-no-img">
              <p class="title">
                <a class="hot-news content-icon" v-if="news.hot">
                  <svg class="font-icon" aria-hidden="true">
                    <use xlink:href="#iconhot"></use>
                  </svg>
                </a>
                {{news.title}}
              </p>
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
import moment from 'moment'
import 'moment/locale/zh-cn'
import LocalStorage from "@/common/localstorage";
import {reportsAdvanceDetail} from "@/api/requests";

export default {
  name: "ReportsChild",
  data(){
    return {
      page: 0,
      prevPage: 0,
      loading: true,
      showTab: true,
      renderData: [],
      port_code: LocalStorage.getPortCode()
    }
  },
  methods: {
    close(){
      this.$router.history.go(-1)
    },
    getReports(){
      let req = reportsAdvanceDetail(this.port_code, this.page)
      req.then(r=>{
        if (r.data?.length > 0){
          this.renderData = this.renderData.concat(r.data)
          this.page ++
        }
        this.loading = false
      }).catch(()=>{
        this.loading = false
      })
    },
    openReport(link){window.open(link)},
    moment(date){
      return moment(date).format('LL')
    },
    scroll(e){
      let bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      if (bottom <= 40 && !this.loading && this.page !== this.prevPage){
        this.loading = true
        let req = reportsAdvanceDetail(this.port_code, this.page)
        req.then(r=>{
          this.prevPage = this.page
          if (r.data?.length > 0){
            this.page ++
            this.renderData = this.renderData.concat(r.data)
          }
          this.loading = false
        }).catch(()=>{
          this.loading = false
        })
      }
    },
  },
  created() {
    this.getReports()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/reports-child";
</style>