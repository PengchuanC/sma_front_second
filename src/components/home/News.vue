<template>
  <div class="news">
    <div class="card-header">
      <p class="header-title">资讯</p>
      <div class="actions">
        <a class="icon-item header-icon" @click="refresh">
          <svg class="font-icon refresh" aria-hidden="true">
            <use xlink:href="#iconRefresh"></use>
          </svg>
        </a>
        <a class="icon-item header-icon" @click="showMore">
          <svg class="font-icon more" aria-hidden="true">
            <use xlink:href="#iconmore2"></use>
          </svg>
        </a>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="news-item-wrapper" v-for="(news, i) in newsList" :key="i">
        <div>
          <a @click="openNews(news.linkaddress)" class="link">
            <p>{{news.infotitle}}</p>
          </a>
        </div>
        <div class="news-source-info">
          <p class="media">{{news.media}}</p>
          <p @click="showDate(i)">{{news.update}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import 'moment/locale/zh-cn'
import {hotNews} from "@/api/requests";

export default {
  name: "News",
  data() {
    return {
      newsList: [],
    }
  },
  methods: {
    refresh() {
      this.getNews()
    },
    openNews(link){
      window.open(link)
    },
    moment(date){
      return moment(date)
    },
    showDate(i){
      this.newsList[i].update = moment(this.newsList[i].realdate).format('lll')
    },
    showMore(){
      this.$router.push({name: 'news'})
    },
    getNews(){
      let req = hotNews()
      req.then(resp=>{
        this.newsList = resp.data.map(x=>{
          x.realdate = x.update
          x.update = moment(x.update).fromNow()
          return x
        })
      })
    }
  },
  mounted() {
    this.getNews()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/news.less";
</style>