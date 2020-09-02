<template>
<div class="message">
  <div class="card-header">
    <p class="header-title">留言</p>
    <a class="icon-item header-icon" @click="showMore">
      <svg class="font-icon more" aria-hidden="true">
        <use xlink:href="#iconmore2"></use>
      </svg>
    </a>
  </div>
  <div class="content">
    <div class="logo-wrapper">
      <div class="logo" @click="showInput=false">
        <img src="../../assets/images/message.svg" alt="" class="image"/>
      </div>
      <div class="logo" @click="showInput=true">
        <img src="../../assets/images/add.svg" alt="" class="image"/>
      </div>
    </div>
  </div>
  <div class="messages">
    <sui-list divided relaxed>
      <ul v-for="(m, i) in messages" :key="'msg'+i">
        <li class="content item-wrapper">
          <p class="item">{{m.message}}</p>
          <p class="reply" v-show="m.reply">答复：{{m.reply}}</p>
          <div class="action-wrapper" style="display: inline-flex; justify-content: space-between;width: 100%">
            <p class="date">{{m.date}}</p>
          </div>
        </li>
      </ul>
    </sui-list>
  </div>
  <div class="input-wrapper" v-show="showInput">
    <label>
      <sui-input
          class="input"
          size="mini"
          placeholder="请留言"
          icon="keyboard outline"
          v-model="message"
          @keyup.enter="submit"
      />
    </label>
    <sui-button class="submit-button" size="mini" color='red' content="发送" @click="submit" />
  </div>
</div>
</template>

<script>
import moment from 'moment'
import {api} from "@/api/base";
import LocalStorage from "@/common/localstorage";

export default {
  name: "Messages",
  data(){
    return {
      showInput: false,
      messages: [],
      message: '',
      port_code: LocalStorage.getPortCode()
    }
  },
  methods: {
    submit(){
      if (this.message.length > 5){
        let date = moment().format('YYYY-MM-DD HH:MM')
        this.messages.unshift({date: date, message: this.message})
        let len = this.messages.length
        if (len > 3){
          this.messages = this.messages.slice(0, 3)
        }
        this.put(this.message, date)
        this.message = ''
      }else{
        this.$Notice.warning({title: '请输入完整的问题'})
      }
    },
    put(message, date){
      api.put('/v2/message/', {
        port_code: this.port_code, message: message, date: date
      }).then()
    },
    showMore(){
      this.$router.push({name: 'message'})
    }
  },
  created() {
    api.get('/v2/message/', { params: {'port_code': this.port_code}}).then(r=>{
      this.messages = r.data.map(x=>{
        return {
          date: moment(x.date).format('YYYY-MM-DD HH:MM'),
          message: x.message, user: x.user, reply: x.reply, replyAt: x.replyAt
        }
      })
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/notice";
</style>