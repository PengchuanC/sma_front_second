<template>
  <div>
    <div class="logo">
      <img src="../../assets/images/logoNew.png" alt="">
    </div>
    <div class="login-wrapper">
      <div class="login slide-in-elliptic-top-fwd">
        <div class="" v-if="!success">
          <sui-form class="form">
            <sui-form-field>
              <label><p class="label">用户</p></label>
              <label class="input">
                <input v-model="username" placeholder="请输入用户名" type="text" required/>
              </label>
            </sui-form-field>
            <sui-form-field>
              <label><p class="label">原密码</p></label>
              <label class="input">
                <input v-model="password" placeholder="请输入密码" type="password" required/>
              </label>
            </sui-form-field>
            <sui-form-field>
              <label><p class="label">新密码</p></label>
              <label class="input">
                <input v-model="newPassword" placeholder="请输入密码" type="password" required/>
              </label>
            </sui-form-field>
            <div is="sui-button-group" class="submit">
              <sui-button color="red" @click.prevent="submit">确认修改</sui-button>
              <sui-button-or />
              <sui-button @click.prevent="toLogin">返回登陆</sui-button>
            </div>
          </sui-form>
        </div>
        <div v-else>
          <div>
            <a class="success">密码修改成功，请返回登陆页面</a>
          </div>
          <sui-button color="red" class="success-button" @click.prevent="toLogin">返回登陆</sui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {resetPassword} from "@/api/login";

export default {
  name: "Reset",
  data(){
    return {
      username: '',
      password: '',
      newPassword: '',
      success: false
    }
  },
  methods:{
    submit(){
      resetPassword(this)
    },
    toLogin(){
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/login";
</style>