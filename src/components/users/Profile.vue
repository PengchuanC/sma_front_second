<template>
  <div class="profile">
    <div class="all-portfolio">
      <div v-for="(d, i) in portfolio" :key="'info'+i" class="portfolio">
        <PortInfo :data="d" />
      </div>
    </div>
    <div class="auth">
      <div is="sui-button-group">
        <sui-button color="red" @click="logout(1)">安全退出</sui-button>
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
        sessionStorage.clear()
        this.$router.push({name: 'auth'})
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
          title: '您尚未登陆',
          desc: '即将返回至登陆页面，请先进行登陆'
        })
        this.$router.push({name: 'auth'})
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