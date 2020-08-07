<template>
  <div class="account">
    <div class="account-card-header">
      <div class="icon">
        <div class="bar" @click="selectIcon(1)">
          <svg class="font-icon image" aria-hidden="true">
            <use xlink:href="#iconzhuzhuangtu" :class="activeId === 1? 'active': ''"></use>
          </svg>
        </div>
        <div class="list" @click="selectIcon(2)">
          <svg class="font-icon image" aria-hidden="true">
            <use xlink:href="#iconliebiao" :class="activeId === 2? 'active': ''"></use>
          </svg>
        </div>
      </div>
      <div class="date-picker">
        <date-picker
            size="small"
            v-model="selectedDate"
            @on-change="changeDate"
        >
        </date-picker>
      </div>
    </div>
    <div class="account-content" v-if="activeId === 1">
      <AccountChart :ratio="ratio" v-if="fetched" />
      <AccountTable :ratio="ratio" v-if="fetched" />
    </div>
  </div>
</template>

<script>
  import {DatePicker} from 'view-design'
  import moment from 'moment'
  import AccountChart from "@/components/account/AccountChart";
  import {getAllocate} from "@/api/home";
  import AccountTable from "@/components/account/AccountTable";

  export default {
    name: "Account",
    components: {AccountTable, AccountChart, DatePicker},
    data(){
      return {
        selectedDate: moment().format('YYYY-MM-DD'),
        activeId: 1,
        ratio: [],
        fetched: false
      }
    },
    methods:{
      selectIcon(i){
        this.activeId = i;
      },
      changeDate(){
        getAllocate(this)
      },
    },
    mounted() {
      this.changeDate()
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account.less";
</style>