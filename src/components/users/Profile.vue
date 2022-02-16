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
import LocalStorage from "@/common/localstorage";
import {portfolioOutlook} from "@/api/requests";

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
      let resp = portfolioOutlook()
      resp.then(r=>{
        this.portfolio = r
        LocalStorage.setPortCode(r[0].port_code)
      }).catch(err=>{
        this.$Notice.error({title: '错误', desc: `${err.data.msg}，即将跳转至认证页面`, duration: 3})
        setTimeout(()=>{
          this.$router.push({name: 'auth'})
        }, 3000)
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