<template>
  <div class="account">
    <BasicInfo />
    <div class="account-card-header">
      <div class="icon">
        <div class="bar" @click="selectIcon(1)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconzhuzhuangtu" :class="activeId === 1? 'active': ''"></use>
            </svg>
          </div>
        </div>
        <div class="list" @click="selectIcon(2)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconliebiao" :class="activeId === 2? 'active': ''"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="date-picker">
        <date-picker
            size="small"
            :value="selectedDate"
            @on-change="changeDate"
        >
        </date-picker>
      </div>
    </div>
    <div class="account-content" v-if="activeId === 1">
      <AccountChart :ratio="ratio" v-if="fetched" />
      <div class="account-table">
        <AssetTable :data="ratio" v-if="fetched"/>
      </div>
    </div>
    <div class="account-holding" v-if="activeId === 2">
      <Holding :selectedDate="selectedDate" v-if="fetched"></Holding>
    </div>
  </div>
</template>

<script>
  import {DatePicker} from 'view-design'
  import moment from 'moment'
  import AccountChart from "@/components/account/AccountChart";
  import {getAllocate} from "@/api/home";
  import Holding from "@/components/account/Holding";
  import AssetTable from "@/components/common/AssetTable";
  import BasicInfo from "@/components/common/BasicInfo";

  export default {
    name: "Account",
    components: {BasicInfo, AssetTable, Holding, AccountChart, DatePicker},
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
      changeDate(e){
        this.selectedDate = this.selectedDate? e: this.selectedDate
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