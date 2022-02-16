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
    <footer class="disclaimer2">
      <p>注： 现金纳入了资产管理计划的应收及应付项，可能与资产管理计划实际可用现金不一致。
      </p>
    </footer>
  </div>
</template>

<script>
  import {DatePicker} from 'view-design'
  import moment from 'moment'
  import AccountChart from "@/components/account/AccountChart";
  import Holding from "@/components/account/Holding";
  import AssetTable from "@/components/common/AssetTable";
  import BasicInfo from "@/components/common/BasicInfo";
  import {assetAllocate} from "@/api/requests";
  import numeral from "numeral";
  import LocalStorage from "@/common/localstorage";

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
        numeral.zeroFormat('0.00')
        numeral.nullFormat('0.00')
        this.fetched = false
        let date;
        if (this.selectedDate) {
          date = moment(this.selectedDate).format('YYYY-MM-DD')
        }
        assetAllocate(LocalStorage.getPortCode(), date).then(resp=>{
          let data = resp
          if (data) {
            this.ratio = data.ratio
            this.profit = data.profit
            this.ratio = data.ratio.map(x=>{
              if (x.category !== '现金') {
                return {
                  category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                  ratio: (x.ratio * 100).toFixed(2), children: [], _loading: false, id :x.id
                }
              }
              return {
                category: x.category, mkt: numeral(x.mkt).format('0,0.00'),
                ratio: (x.ratio * 100).toFixed(2)
              }
            })
            this.ret = data.ret
            this.net_asset = numeral(data.net_asset).format('0,0')
          } else {
            this.selectedDate = this.fetched? data.date: this.selectedDate
            this.ratio = []
            this.ret = null
            this.net_asset = null
          }
          this.fetched = true
        }).catch(()=>{
          this.$Notice.error({title: "数据获取出错", desc: "认证信息已过期，请重新登陆"})
        })
      },
    },
    mounted() {
      this.changeDate()
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account";
@import "../../assets/style/disclaimer";
</style>