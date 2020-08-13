<template>
  <div class="profile">
    <div class="all-portfolio">
      <div v-for="(d, i) in portfolio" :key="'info'+i" class="portfolio">
        <PortInfo :data="d" />
      </div>
    </div>
    <div class="auth">
      <div is="sui-button-group">
        <sui-button color="red" @click="logout(1)">退出登陆</sui-button>
        <sui-button-or />
        <sui-button positive @click="logout(2)">修改密码</sui-button>
      </div>
    </div>
  </div>
</template>

<script>
import PortInfo from "@/components/users/PortInfo";
import {api} from "@/api/base";
import LocalStorage from "@/common/localstorage";
export default {
  name: "Profile",
  components: {PortInfo},
  data(){
    return {
      portfolio: [],
      data: {
        port_code: 'FF9009',
        port_name: '野村东方平衡型策略1号',
        nav: 1.006,
        change: 0.006,
        pct: 0.006,
        total: 1000000,
        profit: 60000,
        date: '2020-08-04'
      }
    }
  },
  methods: {
    logout(type){
      if (type===1){
        localStorage.clear()
        this.$router.push({name: 'login'})
      }else{
        this.$router.push({name: '404'})
      }
    },
    getPortfolio(){
      api.get('/v2/portfolio/').then(resp=>{
        this.portfolio = resp.data
        LocalStorage.setPortCode(resp.data[0].port_code)
      }).catch(()=>{
        this.$Notice.error({
          title: '获取产品信息失败',
          desc: '即将返回至登陆页面，请尝试重新登陆'
        })
        this.$router.push({name: 'login'})
      })
    },
  },
  mounted() {
    this.getPortfolio()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/profile";
</style>