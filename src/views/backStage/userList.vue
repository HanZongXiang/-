<template>
  <div class="user-list">
    <div class="user-manage">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right"> 
          <el-breadcrumb-item :to="{ path:'/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-table :data="tableData" class="table">
        <el-table-column prop="username" label="昵称" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="260">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="350"></el-table-column>
        <el-table-column prop="" label="用户头像" width="200" height="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="avatar">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">查看详细</el-button>
            <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-pagination 
      background
      @current-change="pageChange" 
      layout="prev,pager,next"
      :page-size="5" 
      :total="count">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      tableData: []
    }
  },
  components: {
    
  },
  methods: {
    getData() {
      this.$axios.get('/user').then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },
    handleDetails (id) {
      this.$router.push(`/manage/userDetails?id=${id}`)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该用户信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then((res) => {
        this.$axios.post('/user/delete',{id}).then(res => {
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
  position:absolute;
  top:840px;
  left:670px;
}
</style>
