<template>
  <div class="home">
    <div class="row-9">
      <div class="column">
        <Portfolio />
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
    }
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
  }
}
</script>

<style lang="less">
@import "../../assets/style/home";
</style>
