<template>
<div class="news">
  <p class="card-header">视点</p>
  <div class="content">
    <div class="news-item" v-for="(news, i) in newsList" :key="i">
      <p>{{`${news.title} -- { `}}<a class="source">{{`${news.source} `}}</a>}</p>
    </div>
  </div>
  <div class="logo">
    <img class="image" src="../../assets/images/news.svg" alt="" />
  </div>
</div>
</template>

<script>
export default {
  name: "News",
  data(){
    return {
      newsList: [
        {'title': '年内新发基金规模逼近8000亿元 资金集中流向“明星基金”', 'source': '中国经济网', 'url': ''},
        {'title': '申报"新基建"概念基金达38只 基金经理谨慎布局后市 ', 'source': '中国经济网', 'url': ''},
        {'title': '主动基金超额收益明显 年内最高收益率超50%', 'source': '中国经济网', 'url': ''},
        {'title': '年内新发基金规模逼近8000亿元 资金集中流向“明星基金”', 'source': '中国经济网', 'url': ''},
        {'title': '申报"新基建"概念基金达38只 基金经理谨慎布局后市 ', 'source': '中国经济网', 'url': ''},
        {'title': '主动基金超额收益明显 年内最高收益率超50%', 'source': '中国经济网', 'url': ''},
      ]
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/news.less";
</style>