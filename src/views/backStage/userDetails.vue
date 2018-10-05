<template>
  <div class="user-details">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/manage/users'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">用户详情</h3>
    <div style="margin-top:25px">
      <el-table :data="tableData">
        <el-table-column label="昵称" prop="username" width="150"></el-table-column>
        <el-table-column label="手机" prop="tel" width="150"></el-table-column>
        <el-table-column label="创建时间" prop="createdTime"></el-table-column>
        <el-table-column label="email" prop="email"></el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="avatar">
          </template>
        </el-table-column>
        <el-table-column label="个签" prop="desc"></el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name:'userDetails',
  data() {
    return {
      tableData:[]
    }
  },
  components: {
  },
  methods: {
    getDetails () {
      // console.log(this.$route);
      const id = this.$route.query.id
      this.$axios.get(`/user/${id}`).then(res => {
        console.log(res);
        let time = new Date(res.data.createdTime)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let second = time.getSeconds()
        res.data.createdTime = `${year}年${month}月${day}日${hour}时${minute}分${second}秒` 
        this.tableData = [res.data]
      })
    }
  },
  created () {
    this.getDetails()
  }
}
</script>

<style scoped>
.avatar{
  width: 100px;
  height: 100px;
}
</style>