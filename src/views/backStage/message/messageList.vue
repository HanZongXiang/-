<template>
  <div class="message-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path:'/manage/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>留言管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="wrapper">
      <el-card>
        <div slot="header">留言列表</div>
        <el-table :data="listData">
          <el-table-column label="留言标题" prop="title" width="260">
            
          </el-table-column>
          <el-table-column label="用户" width="200">
            <template slot-scope="scope">
              <img :src="scope.row.author.avatar" style="width: 50px;height: 50px;border-radius: 50%;border: 2px solid #409eff;">
            </template>
              <!-- <img :src="author.avatar"> -->
            
          </el-table-column>
          <el-table-column label="发表时间" width="240">
            <template slot-scope="scope">
              <timer :time="scope.row.createdTime"></timer>
            </template>
          </el-table-column>
          <el-table-column label="留言内容" prop="content" width="150">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详细</el-button>
              <el-button type="warning" size="mini" @click="handleEdit(scope.row._id)">编辑留言</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">删除留言</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="page-wrap">
          <!-- <el-pagination
            background
            layout="prev, pager, next, jumper"
            :total="5"
            :page-size="5"
            @current-change="pageChange"
          >
          </el-pagination> -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listData: [],
        pn: 1,
        size: 7
      }
    },
    methods: {
      getListData () {
        this.$axios.get('/message', {pn: this.pn, size: this.size}).then(res => {
          if (res.code === 200) {
            this.listData = res.data
          }
        })
      },
      handleDelete (id) {
        this.$confirm('此操作将永久删除该文留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/message/delete', {id}).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.getListData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    created () {
      this.getListData()
    }
  }
</script>

<style scoped>

</style>