<template>
  <div class="goods-list">
    <div class="good-manage">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right"> 
          <el-breadcrumb-item :to="{ path:'/manage/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-table :data="tableData" class="table">
        <el-table-column prop="name" label="商品名" width="280"></el-table-column>
        <el-table-column prop="" label="商品图片" width="300" height="100">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品标价" width="160">
        </el-table-column>
        <el-table-column label="热度" width="250">
          <template slot-scope="scope">
            <el-tag>{{scope.row.heat}}</el-tag>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="warning">编辑商品</el-button>
            <el-button @click="handleDetails(scope.row._id)" size="mini" type="primary">查看详细</el-button>
            <el-button @click="handleDelete(scope.row._id)" size="mini" type="danger">删除商品</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination 
      background
      @current-change="pageChange" 
      layout="prev,pager,next,jumper"
      :page-size="5" 
      :total="count">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1
    }
  },
  components: {
    
  },
  methods: {
    getData() {
      this.$axios.get('/goods', {page: this.page, page_size: 5}).then(res => {
        console.log(1)
        if (res.code == 200) {
          this.tableData = res.data
          this.count = res.total
        }
      })
    },
    pageChange (page) {
      this.page = page
      this.getData()
    },
    handleDetails (id) {
      this.$router.push(`/manage/userDetails?id=${id}`)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该商品信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then((res) => {
        this.$axios.post('/goods/delete',{id}).then(res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.getData()
          }
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
.breadcrumb{
  position: relative;
}
.table{
  margin-top: 20px;
}
el-table-column:last-child {
  margin-left: 50px;
}
.avatar{
  width: 100px;
  height: 100px;
}
.el-pagination{
  margin-left: 200px;
}
</style>
