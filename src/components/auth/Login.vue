<template>
  <div>
    <div class="logo">
      <img src="../../assets/images/logoNew.png" alt="">
    </div>
    <div class="login-wrapper">
      <div class="login slide-in-elliptic-top-fwd">
        <div class="">
          <sui-form class="form">
            <div class="welcome focus-in-contract-bck">
              <h2>欢迎回到野村东方SMA业务平台</h2>
            </div>
            <sui-form-field>
              <label><p class="label">用户</p></label>
              <label class="input">
                <input v-model="username" placeholder="请输入用户名" type="text" required/>
              </label>
              <div class="remember-me">
                <sui-checkbox v-model="remember" label="" style="color: white"/>
                <p @click="remember=!remember">记住我的用户名</p>
              </div>
            </sui-form-field>
            <sui-form-field>
              <label><p class="label">密码</p></label>
              <label class="input">
                <input v-model="password" placeholder="请输入密码" type="password" required/>
              </label>
            </sui-form-field>
            <div is="sui-button-group" class="submit">
              <sui-button color="red" @click.prevent="login">登陆系统</sui-button>
              <sui-button-or/>
              <sui-button @click.prevent="reset">修改密码</sui-button>
            </div>
          </sui-form>
        </div>
        <div class="forget">
          <p class="item" @click="contactUs">忘记用户名或登陆密码</p>
          <div class="info">
            <a class="info-icon wechat">
              <svg class="font-icon info-icon" aria-hidden="true">
                <use xlink:href="#icongongzhonghaoguanli"></use>
              </svg>
            </a>
            <div class="info-item">
              <a class="info-icon legal" @click="toLegal">
                <svg class="font-icon info-icon" aria-hidden="true">
                  <use xlink:href="#iconfalvshengmingfalv"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from "@/api/login"

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      remember: false,
    }
  },
  methods: {
    login() {
      if (this.remember) {
        localStorage.setItem('username', this.username)
      } else {
        localStorage.setItem('username', '')
      }
      login(this)
    },
    reset() {
      this.$router.push({name: 'reset'})
    },
    toLegal() {
      window.open("https://www.nomuraoi-sec.com/pages/function/company_announcement.jsp?newsid=1702")
    },
    contactUs() {
      window.open('https://www.nomuraoi-sec.com/pages/aboutUS/contect_us.jsp')
    }
  },
  mounted() {
    this.username = localStorage.getItem('username')
    if (this.username) {
      this.remember = true
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/login";
</style>