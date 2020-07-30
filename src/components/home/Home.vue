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

export default {
  name: "Home",
  components: {Messages, Notice, News, Reports, Portfolio}
}
</script>

<style lang="less">
@import "../../assets/style/home";
</style>

<style scoped>
</style>