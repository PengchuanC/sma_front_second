<template>
    <div class="head">
        <div class="head-child">
            <a class="logo">
                <img src="../assets/images/logoNew.png" alt="">
            </a>
            <div class="menu-wrapper">
                <sui-menu secondary class="menu" borderless>
                    <a
                            is="sui-menu-item"
                            v-for="(value, key) in routeMap"
                            :active="isActive(key)"
                            :key="key"
                            :content="value"
                            @click="select(key)"
                            style="color: white"
                    />
                </sui-menu>
                <sui-menu secondary class="menu-user" borderless>
                    <a
                            is="sui-menu-item"
                            :active="isActive('user')"
                            @click="select('user')"
                            style="color: white"
                    >
                      <sui-icon name="user" color="red" inverted circular fitted />
                    </a>
                </sui-menu>
            </div>
        </div>

        <sui-segment class="segment">
          <router-view class="router-view" />
        </sui-segment>
        <footer>
            COPYRIGHT © 2020 Nomura Orient International Securities Co.,Ltd. ALL RIGHTS RESERVED.
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        data() {
            return {
              active: '首页',
              items: ['首页', '账户信息', '业绩表现', '关于我们'],
              routeMap: {'layout': '首页', 'account': '账户信息', 'performance': '业绩表现', 'about': '关于我们'}
            };
        },
        methods: {
            isActive(name) {
                return this.active === name;
            },
            select(name) {
                this.active = name;
                if (name === 'about') {
                  window.location.href = 'https://www.nomuraoi-sec.com/pages/aboutUS/company_profile.jsp'
                }else{
                  let currentPath = this.$route.name
                  if (currentPath !== name){
                    this.$router.push({name: name})
                  }
                }

            },
        },
    }
</script>

<style scoped lang="less">
    @import "../assets/style/layout.less";

</style>