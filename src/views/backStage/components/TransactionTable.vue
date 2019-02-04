<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="创建时间" min-width="200">
      <template slot-scope="scope">
        <timer :time="scope.row.createdTime"></timer>
      </template>
    </el-table-column>
    <el-table-column label="订单商品" width="195" align="center">
      <template slot-scope="scope">
        {{ scope.row.product.name }}
      </template>
    </el-table-column>
    <el-table-column label="商品价格" width="105" align="center">
      <template slot-scope="scope">
        ￥ {{ scope.row.product.price }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag type="danger">派单中</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.$axios.get('/order').then(res => {
        this.list = res.data
      })
    }
  }
}
</script>
