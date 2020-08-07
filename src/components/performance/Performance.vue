<template>
  <div class="performance">
    <div class="performance-header">
      <div class="icon">
        <div class="icon-item" @click="selectIcon(1)">
          <div class="image-wrapper">
            <svg class="font-icon image"  aria-hidden="true">
              <use xlink:href="#iconliebiao"  :class="activeId === 1? 'active': ''"></use>
            </svg>
          </div>
        </div>
        <div class="icon-item" @click="selectIcon(2)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconzhutu" :class="activeId === 2? 'active': ''"></use>
            </svg>
          </div>
        </div>
        <div class="icon-item" @click="selectIcon(3)">
          <div class="image-wrapper">
            <svg class="font-icon image" aria-hidden="true">
              <use xlink:href="#iconlinechart" :class="activeId === 3? 'active': ''"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="date-picker">
        <date-picker
            class="picker"
            :value="selectedDates"
            format="yyyy/MM/dd"
            type="daterange"
            placement="bottom-end"
            placeholder="选择区间"
            size="small"
        >
        </date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import {DatePicker} from 'view-design'

export default {
  name: "Performance",
  components: {DatePicker},
  data(){
    return {
      activeId: 1,
      selectedDates: ['2020-04-13', '2020-07-28']
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
@import "../../assets/style/performance.less";
</style>