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
                <sui-menu secondary class="menu-user" borderless v-if="showMe">
                    <a
                            is="sui-menu-item"
                            :active="isActive('user')"
                            @click="select('user')"
                            style="color: white"
                    >
                      <sui-icon name="user" color="red" inverted circular fitted />
                    </a>
                </sui-menu>
              <sui-menu secondary class="menu-user" borderless v-else>
                <a
                    is="sui-menu-item"
                    :active="isActive('user')"
                    @click="logout"
                    style="color: white"
                >
                  <sui-icon name="logout" color="red" inverted circular fitted />
                </a>
              </sui-menu>
            </div>
        </div>

        <sui-segment class="segment slide-in-fwd-center">
          <keep-alive>
              <router-view class="router-view" />
          </keep-alive>
        </sui-segment>
        <footer>
            COPYRIGHT © 2020 Nomura Orient International Securities Co.,Ltd. ALL RIGHTS RESERVED.
        </footer>
    </div>
</template>

<script>
    import LocalStorage from "@/common/localstorage";

    export default {
        name: "Layout",
        data() {
            return {
              active: '首页',
              items: ['首页', '账户信息', '业绩表现', '投资记录', '关于我们'],
              routeMap: {'layout': '首页', 'account': '账户信息', 'performance': '业绩表现', 'records': '投资记录', 'about': '关于我们'},
              showMe: false
            };
        },
        methods: {
            isActive(name) {
                return this.active === name;
            },
            select(name) {
                this.active = name;
                if (name === 'about') {
                  window.open('https://www.nomuraoi-sec.com/pages/aboutUS/company_profile.jsp')
                }else{
                  let currentPath = this.$route.name
                  if (currentPath !== name){
                    this.$router.push({name: name})
                  }
                }

            },
          logout(){
              sessionStorage.clear()
            this.$router.push({name: 'login'})
          }
        },
      mounted() {
          if (LocalStorage.getPortNums() <=1) {
            this.showMe = false
          }
      }
    }
</script>

<style scoped lang="less">
    @import "../assets/style/layout.less";

</style>