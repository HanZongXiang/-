<template>
  <div class="music w960">
    <div class="music-wrap">
      <aplayer v-if="isShow" autoplay showLrc
        mode="ciuculation"
        :music="musicData[0]"
        :list="musicData"
      />
    </div>
    <div class="pagination-wrap">
      <el-pagination
        @current-change="pageChange"
        :page-size="12"
        background
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'

export default {
  name:'',
  data() {
    return {
      isShow:false,
      musicData:[],
      pn:1,
      count:0
    }
  },
  components: {
    Aplayer
  },
  methods: {
    getMusicData() {
      this.$axios.get('/music',{pn:this.page,size:12}).then(res => {
        this.isShow = false
        if (res.code == 200) {
          this.musicData = res.data
          this.count = res.count
        }
        this.isShow = true
      })
    },
    pageChange (page) {
      this.page = page;
      console.log(page);
      this.getMusicData()
    }
  },
  created() {
    this.getMusicData()
  }
}
</script>

<style scoped>
.music-wrap{
  width: 600px;
  position: relative;
}
.pagination-wrap{
  position:fixed;
  top:700px;
  left:480px;
}
</style>
