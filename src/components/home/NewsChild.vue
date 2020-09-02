<template>
  <div class="news-child">
    <div class="news-child-card-header">
      <div class="news-tab">
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
      <div class="news-content-wrapper" v-for="(n, i) in renderData" :key="'nc'+i">
        <p class="news-title" @click="openNews(n.linkaddress)">{{n.infotitle}}</p>
        <div class="news-info">
          <p class="news-media">{{n.media}}</p>
          <p class="news-date">{{n.infopubldate + ' ' + n.infopubltime}}</p>
        </div>
        <p class="news-content">{{delHtmlTag(n.content)}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/base";

export default {
  name: "NewsChild",
  data(){
    return {
      activeId: 0,
      page: 1,
      loading: true,
      tabs: ['宏观', '国际', '证券市场', '基金', '私募'],
      pages: {},
      news: {},
      renderData: [],
    }
  },
  methods: {
    close(){
      this.$router.history.go(-1)
    },
    selectTab(i){
      this.activeId = i
      this.getNews()
    },
    getNews(){
      this.loading = true
      let category = this.tabs[this.activeId]
      let page = this.pages[this.activeId]
      let i = this.activeId
      api.get('/v2/news/advance/', {params:{category: category, page: page}}).then(r=>{
        let data = r.data
        this.news[i] = this.news[i].concat(data)
        this.renderData = this.news[i]
        this.loading = false
      }).catch(()=>
      {
        this.loading = false
      })
    },
    delHtmlTag(str){
      return str.replace(/<[^>]+>/g,"");  //正则去掉所有的html标记
    },
    openNews(link){
      window.open(link)
    },
    scroll(e){
      let bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight
      if (bottom <= 40 && !this.loading){
        this.pages[this.activeId] = this.pages[this.activeId] + 1
        this.getNews()
      }
    },
  },
  created() {
    // 初始化pages和news
    this.tabs.forEach((_, i)=>{
      this.pages[i] = 1
      this.news[i] = []
    })
    this.getNews()
  },
}
</script>

<style scoped lang="less">
@import "../../assets/style/news";
</style>