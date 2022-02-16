<template>
  <div class="home">
    <div class="row-9">
      <div class="column">
        <Portfolio />
        <footer class="disclaimer">
          <p>注：产品成立日期为{{ launchDate }}，固收、权益、另类和货币指代对应类别基金、资产管理计划或银行理财等类型产品，投资明细请见账户信息页。
          现金纳入了资产管理计划的应收及应付项，可能与资产管理计划实际可用现金不一致。
          </p>
        </footer>
      </div>
    </div>
    <div class="row-9">
      <div class="column">
        <News />
        <Reports />
      </div>
    </div>
    <div class="row-6">
      <div class="column">
        <Notice />
        <Messages />
      </div>
    </div>
  </div>
</template>

<script>
import Portfolio from "./Portfolio";
import News from "./News";
import Reports from "./Reports";
import Notice from "./Notice";
import Messages from "./Messages";
import LocalStorage from "@/common/localstorage";

export default {
  name: "Home",
  components: {Messages, Notice, News, Reports, Portfolio},
  data(){
    return {
      port_code: null,
      launchDate: ''
    }
  },
  mounted() {
  },
  created() {
    this.port_code = this.$route.params.port_code
    let auth = this.$route.query['signmsg']
    LocalStorage.setIdentification(auth)
    let local = LocalStorage.getPortCode()
    if (!this.port_code && !local){
      this.$router.push({name: 'user'})
    }
    if (this.port_code) {
      LocalStorage.setPortCode(this.port_code)
    }else{
      this.port_code = local
    }
    this.portCode = this.port_code
  }
}
</script>

<style lang="less">
@import "../../assets/style/home";
</style>
