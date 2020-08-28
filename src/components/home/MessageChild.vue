<template>
  <div class="message-child">
    <div class="message-child-card-header">
      <p>留言板</p>
      <a class="close-icon" @click="close">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconclose"></use>
        </svg>
      </a>
    </div>
    <sui-loader active v-if="loading" />
    <div v-else class="message-child-content">
      <div class="content-wrapper" v-for="(m, i) in messages" :key="'msgc'+i">
        <div class="comment-wrapper">
          <div class="info-wrapper">
            <p class="info-item">提问时间</p>
            <p class="info-item" date @click="changeDateType1(i)">{{ m.relativeDate }}</p>
          </div>
          <p class="comment">
            {{`${i+1}.${m.message}`}}
          </p>
        </div>
        <div class="reply-wrapper" v-show="m.reply">
          <div class="info-wrapper">
            <p class="info-item">答复时间</p>
            <p class="info-item" date @click="changeDateType2(i)">{{ m.relativeReplyAt }}</p>
          </div>
          <p class="reply">
            {{ m.reply }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/base";
import moment from "moment";
import 'moment/locale/zh-cn';
import LocalStorage from "@/common/localstorage";

export default {
  name: "MessageChild",
  data(){
    return {
      loading: true,
      messages: [],
      port_code: LocalStorage.getPortCode()
    }
  },
  methods: {
    getComments(){
      this.loading = true
      api.post('/v2/message/', { 'port_code': this.port_code}).then(r=>{
        this.messages = r.data.map(x=>{
          return {
            date: moment(x.date).format('lll'), relativeDate: moment(x.date).fromNow(),
            message: x.message, user: x.user, reply: x.reply, replyAt: moment(x.replyAt).format('lll'),
            relativeReplyAt: moment(x.replyAt).fromNow()
          }
        })
        this.loading = false
      })
    },
    close(){
      this.$router.history.go(-1)
    },
    changeDateType1(i){
      this.messages[i].relativeDate = this.messages[i].date
    },
    changeDateType2(i){
      this.messages[i].relativeReplyAt = this.messages[i].replyAt
    }
  },
  mounted() {
    this.getComments()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/message-child";
</style>