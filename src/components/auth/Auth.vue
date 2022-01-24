<template>
  <div>
    <div class="logo">
      <img src="../../assets/images/logoNew.png" alt="">
    </div>
    <div class="login-wrapper" :season="season">
      <div class="wrapper-mask"></div>
      <div class="login slide-in-elliptic-top-fwd">
        <div>
          <div class="welcome focus-in-contract-bck">
            <h2>欢迎访问野村东方国际证券SMA服务平台</h2>
          </div>
          <div style="height: 230px;display: block">
            <div v-if="!registered">
              <sui-form class="form" style="margin-top: 50px;">
                <sui-form-field>
                  <label><p class="label">证件号码：</p></label>
                  <label class="input">
                    <input v-model="identify" placeholder="请输入开户时登记的证件号" type="text" required/>
                  </label>
                </sui-form-field>
                <div class="auth-notify" v-show="!idCheck">
                  <div class="auth-notify-wrapper">
                    <p class="auth-notify-content">
                      {{checkErr}}
                    </p>
                  </div>
                </div>
                <div>
                  <sui-button color="red" @click.prevent="verify" style="width: 100%;margin-top: 10px">查询</sui-button>
                </div>
              </sui-form>
            </div>
            <div v-else class="auth-wrapper">
              <sui-input
                  v-model="mobile"
                  placeholder="手机号码"
                  icon-position="left"
                  icon="mobile"
                  style="width: 100%"
              />
              <div class="auth-sms">
                <sui-input
                    v-model="code"
                    placeholder="短信验证码"
                    icon-position="left"
                    icon="envelope"
                    style="width: 230px"
                />
                <sui-button class="auth-get-code-button" color="green" v-if="!loading" @click="getCode">获取验证码</sui-button>
                <sui-button class="auth-get-code-button" v-else>{{`${timer}s 后可获取`}}</sui-button>
              </div>
              <div class="auth-notify" v-if="loadingMsg">
                <div class="auth-notify-wrapper">
                  <p class="auth-notify-content">
                    {{codeMsg}}
                  </p>
                </div>
              </div>
              <div>
                <sui-button color="red" @click.prevent="login" style="margin-top: 10px;width: 100%">登陆</sui-button>
              </div>
            </div>
          </div>
        </div>
        <div class="forget">
          <div class="item">
            登陆时遇到问题
            <div class="tooltip">
              <p>SMA专员</p>
              <div class="tel">
                <p>姓名</p>
                <p>邓希</p>
              </div>
              <div class="tel">
                <p>电话</p>
                <p>021-66199064</p>
              </div>
            </div>
          </div>
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
import {loginApi} from "@/api/base";
import {getPortfolio} from "@/api/login";
import lunar from "@/common/lunar"

export default {
  name: "Auth",
  data() {
    return {
      identify: '',
      code: '',
      registered: false,
      idCheck: true,
      checkErr: '身份证号码长度错误，请检查.',
      mobile: '',
      username: '',
      loading: false,
      loadingMsg: false,
      codeMsg: '',
      timer: 89,
      season: 'spring',
    }
  },
  methods: {
    verify() {
      this.idCheck = true
      localStorage.setItem('identify', this.identify)
      if (this.identify.length !== 18 && this.identify.length !== 9) {
        this.idCheck = false
        return
      }
      loginApi.post('/sms/idcheck/', {identify: this.identify}).then(r=>{
        let data = r.data
        if (data.code === 0){
          this.registered = true
          this.username = data.username
        } else {
          this.idCheck = false
          this.checkErr = "验证错误，请输入您在开户时登记的身份证号码."
        }
      })
    },
    getCode(){
      this.code = ''
      loginApi.get('/sms/code/', {params: {username: this.username, 'mobile': this.mobile}}).then(r=>{
        let data = r.data
        this.codeMsg = data.msg
      })
      this.loading = true
      this.loadingMsg = true
      let interval = setInterval(()=>{
        if (this.timer > 0){
          this.timer --
        } else {
          this.timer = 89
          this.loading = false
          clearInterval(interval)
        }
      }, 1000)
    },
    login(){
      loginApi.post('/sms/code/', {username: this.username, code: this.code}).then(r=>{
        let data = r.data
        if (data.code !== 0) {
          this.loadingMsg = true
          this.codeMsg = data.msg
          return
        }
        getPortfolio(this)
      })
    },
    toLegal() {
      window.open("https://www.nomuraoi-sec.com/pages/function/company_announcement.jsp?newsid=1702")
    },
    contactUs() {
      window.open('https://www.nomuraoi-sec.com/pages/aboutUS/contect_us.jsp')
    },
    getSeason() {
      let today = new Date()
      console.log(today.getFullYear(), today.getMonth(), today.getDay())
      return lunar.getSeason(today.getFullYear(), today.getMonth(), today.getDay())
    },
    getSeason2() {
      let today = new Date()
      let month = today.getMonth()
      if([0, 1, 2].includes(month)) {
        return 'spring'
      } else if ([3, 4, 5].includes(month)) {
        return 'summer'
      } else if ([6, 7, 8].includes(month)) {
        return 'autumn'
      }
      return 'winter'
    }
  },
  mounted() {
    this.username = localStorage.getItem('username')
    if (this.username) {
      this.remember = true
    }
    this.season = this.getSeason()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/login";
</style>
