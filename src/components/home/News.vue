<template>
  <div class="news">
    <div class="card-header">
      <p class="header-title">视点</p>
      <a class="icon-item header-icon" @click="refresh">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconRefresh"></use>
        </svg>
      </a>
    </div>
    <div class="content">
      <div class="news-item" v-for="(news, i) in newsList" :key="i">
        <a @click="openNews(news.linkaddress)" class="link">
          <p>{{news.infotitle}}</p>
        </a>
        <div class="source-info">
          <p class="media">{{news.media}}</p>
          <p @click="showDate(i)">{{news.infopubldate}}</p>
        </div>
      </div>
    </div>
    <div class="logo">
      <img class="image" src="../../assets/images/news.svg" alt=""/>
    </div>
  </div>
</template>

<script>

import {getNews} from "@/api/home"
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  name: "News",
  data() {
    return {
      newsList: [],
    }
  },
  methods: {
    refresh() {
      getNews(this)
    },
    openNews(link){
      window.open(link)
    },
    moment(date){
      return moment(date)
    },
    showDate(i){
      this.newsList[i].infopubldate = moment(this.newsList[i].realdate).format('LL')
    }
  },
  mounted() {
    getNews(this)
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/news.less";
</style>