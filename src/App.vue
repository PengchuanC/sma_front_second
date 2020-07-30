<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

  export default {
    name: 'App',
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: Arial, 'SourceHanSansCN','思源宋体', 'Noto Serif CJK SC', 'Noto Serif CJK', 'Source Han Serif SC',
  'Source Han Serif', source-han-serif-sc, '宋体', serif;
  background: url(assets/images/bg.png) no-repeat center center;
  background-size: 100% 100%;
}
</style>
