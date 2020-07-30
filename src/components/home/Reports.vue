<template>
  <div class="reports">
    <p class="card-header">报告</p>
    <div class="content">
      <div class="logo">
        <img class="image" src="../../assets/images/reports.svg" alt="" />
      </div>
      <div class="news-item" v-for="(news, i) in reports" :key="i">
        <p>{{`${news.title} -- { `}}<a class="source">{{`${news.source} `}}</a>}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reports",
  data(){
    return {
      reports: [
        {'title': '5月债市巨震， 股市成长风格占优', 'source': '产品月报.2020-06-01', 'url': ''},
        {'title': '国内政策未超预期，A股弱势调整', 'source': '产品周报.2020-05-25', 'url': ''},
        {'title': '全球市场出现回调 A股显韧性', 'source': '产品周报.2020-05-18', 'url': ''},
        {'title': '乐观情绪下权益持续强势，固收走弱', 'source': '产品周报.2020-05-11', 'url': ''},
      ]
    }
  }
}
</script>

<style scoped lang="less">
@import '../../assets/style/reports.less';
</style>