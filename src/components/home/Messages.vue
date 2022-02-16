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
      <a class="icon-item content-icon" @click="showContent(1)">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconxiaoxi"></use>
        </svg>
      </a>
      <a class="icon-item content-icon" @click="showContent(2)">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconphone05"></use>
        </svg>
      </a>
    </div>
    <div v-show="showMessage">
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
    <div v-show="showPhone" class="phone-mail-wrapper">
      <p class="phone-mail">{{sales.name}}</p>
      <p>野村东方国际证券有限公司</p>
      <p class="phone-mail">电话：{{sales.phone}}</p>
      <p class="phone-mail">邮箱：{{sales.mail}}</p>
      <p class="phone-mail">地址：上海市淮海中路381号中环广场15层</p>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import LocalStorage from "@/common/localstorage";
import {chatHistory, sendMessage} from "@/api/requests"

export default {
  name: "Messages",
  data(){
    return {
      messages: [],
      message: '',
      port_code: LocalStorage.getPortCode(),
      showMessage: true,
      showInput: true,
      showPhone: false,
      sales: {}
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
      let req = sendMessage(this.port_code, message, date)
      req.then()
    },
    showMore(){
      this.$router.push({name: 'message'})
    },
    showContent(i){
      switch (i){
        case 1:
          this.showMessage = true;
          this.showInput = true;
          this.showPhone = false;
          break
        case 2:
          this.showMessage = false;
          this.showInput = false;
          this.showPhone = true;
          break
        default:
          this.showMessage = true;
          this.showInput = true;
          this.showPhone = false;
      }
    },
    getHistoryChat(){
      let req = chatHistory(this.port_code)
      req.then(r=>{
        this.messages = r.msg.map(x=>{
          return {
            date: moment(x.date).format('YYYY-MM-DD HH:MM'),
            message: x.message, user: x.user, reply: x.reply, replyAt: x.replyAt
          }
        })
        this.sales = r.sales
      })
    }
  },
  mounted() {
    this.getHistoryChat()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/notice";
</style>