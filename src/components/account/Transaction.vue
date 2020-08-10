<template>
  <div class="transaction">
    <Table
        class="transaction-table"
        size="small"
        :columns="columns"
        :data="data"
        border stripe
    ></Table>
  </div>
</template>

<script>
export default {
  name: "Transaction",
  props: {
    data: Array
  },
  data() {
    return {
      columns:  [
        {
          title: '交易类型',
          key: 'operation'
        },
        {
          title: '交易规模',
          key: 'amount'
        },
        {
          title: '交易日期',
          key: 'date'
        },
        {
          title: '交易价格(元)',
          key: 'price'
        },
        {
          title: '手续费(元)',
          key: 'fee'
        }
      ]
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="less">
@import "../../assets/style/account";
</style>