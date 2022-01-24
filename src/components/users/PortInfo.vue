<template>
  <div class="outlook" @click="show">
    <div class="header">
      <h5>{{data.port_name}}</h5>
    </div>
    <div class="performance">
      <p class="nav" :class="color">{{percent(data.nav, 4)}}</p>
      <div class="change">
        <p class="item" :class="color">{{percent(data.change, 4)}}</p>
        <p class="item" :class="color">{{percent(data.pct, 2)}}%</p>
      </div>
    </div>
    <hr>
    <div class="performance">
      <p>净资产(万元)</p>
      <p>{{numeral(data.total)}}</p>
    </div>
    <div class="performance">
      <p>当日盈亏(元)</p>
      <p>{{numeral(data.profit)}}</p>
    </div>
    <p class="note">{{data.date}}</p>
  </div>
</template>

<script>
import numeral from 'numeral'
import LocalStorage from "@/common/localstorage";

export default {
  name: "PortInfo",
  props: {
    data: Object
  },
  data(){
    return {
      color: 'red'
    }
  },
  methods: {
    show(){
      let port_code = this.data.port_code
      LocalStorage.setPortCode(port_code)
      this.$router.push({name: 'info', params: {port_code: port_code}})
    },
    numeral(value){
      return numeral(value).format('00,0.00')
    },
    percent(value, digit){
      return numeral(value).format('0.'+Array(digit+1).join('0'))
    }
  },
  created() {
    this.color = this.data.pct >=0? 'red': 'green'
  }
}
</script>

<style scoped lang="less">
.outlook {
  width: 100%;
  height: 100%;
  border: 1px solid #efefef;
  background-color: rgba(251,251,251,0.3);
  padding: 15px 10px 0 10px;
  cursor: pointer;

  h5 {
    text-align: left;
  }

  i {
    cursor: pointer;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .performance {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .nav {
      font-size: xx-large;
    }

    .change {
      display: block;
      text-align: right;
    }
  }

  hr {
    margin: 10px 0;
    padding: 0;
    border: 1px dashed #C0C0C0;
  }

  .note {
    text-align: left;
    font-size: smaller;
    color: #C0C0C0;
    margin-top: 5px;
  }

  .red {
    color: #CB2220;
  }

  .green {
    color: #42b983;
  }
}
</style>