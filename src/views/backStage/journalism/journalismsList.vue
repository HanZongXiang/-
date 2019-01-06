<template>
  <div class="news-list">
    <el-card class="">
      <div slot="header">新闻列表</div>
      <el-table :data="tableData">
        <el-table-column label="新闻标题" prop="title" width="260">
          
        </el-table-column>
        <el-table-column label="上传者" prop="uploader.username" width="200">

        </el-table-column>
        <el-table-column label="上传时间" width="240">
          <template slot-scope="scope">
            <timer :time="scope.row.createdTime"></timer>
          </template>
        </el-table-column>
        <el-table-column label="阅读数" prop="readnums" width="150">
          <template slot-scope="scope">
            <el-tag>
              {{scope.row.readnums}}
            </el-tag>
          </template>
          
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetail(scope.row._id)">查看详情</el-button>
            <el-button type="warning" size="mini" @click="handleEdit(scope.row._id)">编辑新闻</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">删除新闻</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-wrap">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          :total="5"
          :page-size="5"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-card>
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
    getTableData() {
      this.$axios.get('/journalisms').then(res => {
        if (res.code == 200) {
          this.tableData = res.data
        }
      })
    },
    handleDelete (id) {
      this.$axios.post('/journalism/delete', {id}).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.getTableData()
        }
      })
    },
    handleDetail (id) {
      this.$router.push(`/manage/journalismDetail/${id}`)
    },
    handleEdit () {
      alert('编辑是不可能的，这辈子都不可能的')
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped>
</style>
