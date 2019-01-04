<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单号" min-width="200">
      <template slot-scope="scope">
        {{ scope.row.order_no }}
      </template>
    </el-table-column>
    <el-table-column label="订单价" width="195" align="center">
      <template slot-scope="scope">
        ¥{{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="100" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status"> {{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      list: [
        {
          order_no: 44575387121,
          price: 315,
          status: 'success'
        },
        {
          order_no: 44575387122,
          price: 446,
          status: 'success'
        },
        {
          order_no: 44575387123,
          price: 225,
          status: 'pending'
        },
        {
          order_no: 44575387124,
          price: 268,
          status: 'success'
        },
        {
          order_no: 44575387125,
          price: 784,
          status: 'success'
        },
        {
          order_no: 44575387126,
          price: 486,
          status: 'pending'
        },
        {
          order_no: 44575387127,
          price: 578,
          status: 'success'
        }
      ]
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>
