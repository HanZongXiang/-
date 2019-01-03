<template>
  <div class="music-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path:'/manage/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>音乐列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="listData">
        <el-table-column prop="title" label="歌曲名" width="180"></el-table-column>
        <el-table-column prop="artist" label="歌手" width="200"></el-table-column>
        <el-table-column label="歌曲封面" prop="pic">
          <template slot-scope="scope">
            <img :src="scope.row.pic" class="pic">
          </template>
        </el-table-column>
        <el-table-column label="上传者" prop="uploader"></el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            <timer :time="scope.row.createdTime"></timer>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteMusic(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        listData: [],
        pn: 1,
        size: 8,
        count: 0
      }
    },
    methods: {
      getMusicList () {
        this.$axios.get('/music',{pn: this.pn,size: this.size}).then(res => {
          if (res.code === 200) {
            this.listData = res.data
            this.count = res.count
          }
        })
      }
    },
    created () {
      this.getMusicList()
    }
  }
</script>

<style scoped lang="scss">
.music-list {
  margin-right: 9px;
  .breadcrumb {
    margin-bottom: 15px;
  }
  .pic {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    border: 2px solid #40dffd;
    -webkit-animation:run 6s linear 0s infinite
  }
  @-webkit-keyframes run {  
    from {  
      -webkit-transform:rotate(0deg);  
    }  
    to {  
      -webkit-transform:rotate(360deg);  
    }  
  }  
}
</style>