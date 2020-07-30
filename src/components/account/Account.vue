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
            :value="selectedDate"
        >
        </date-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import {DatePicker} from 'view-design'

  export default {
    name: "Account",
    components: {DatePicker},
    data(){
      return {
        selectedDate: '2020-07-28',
        activeId: 1,
      }
    },
    methods:{
      selectIcon(i){
        this.activeId = i;
      }
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/style/account.less";
</style>