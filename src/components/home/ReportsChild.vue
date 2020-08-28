<template>
  <div class="reports-child">
    <div class="reports-child-card-header">
      <div class="reports-tab" v-show="showTab">
        <a :class="activeId===i?'tab-item tab-active':'tab-item'"
           v-for="(t, i) in tabs" :key="'rtb'+i"
           @click="selectTab(i)"
        >{{t}}</a>
      </div>
      <a class="close-icon" @click="close">
        <svg class="font-icon" aria-hidden="true">
          <use xlink:href="#iconclose"></use>
        </svg>
      </a>
    </div>
    <div class="reports-child-content">
      <sui-loader active v-if="loading" />
      <div class="reports-list" v-else>
        <div v-for="(r, i) in renderData" :key="'ren'+i">
          <p>{{r.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api} from "@/api/base";

export default {
  name: "ReportsChild",
  data(){
    return {
      activeId: 0,
      loading: true,
      showTab: false,
      tabs: ['产品周报', '产品月报'],
      reports: {},
      renderData: [],
    }
  },
  methods: {
    close(){
      this.$router.history.go(-1)
    },
    selectTab(i){
      this.activeId = i
      let name = this.tabs[i]
      this.getReportsByType(name)
    },
    getReports(){
      api.get('/v2/reports/advance/').then(r=>{
        let data = r.data
        this.tabs = data.category
        this.reports = data.reports
        this.showTab = true
        this.selectTab(0)
      })
    },
    getReportsByType(type){
      this.loading = true
      api.post('/v2/reports/advance/', {category: type}).then(r=>{
        this.renderData = r.data
        console.log(this.renderData)
        this.loading = false
      })
    }
  },
  created() {
    this.getReports()
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/reports-child";
</style>