<template>
  <div>
    <!-- <el-card class="music w960">
      <div slot="header">音乐列表</div>
      <div class="music-wrap">
        <aplayer v-if="isShow"
          showLrc
          repeat="list"
          listMaxHeight="30"
          :music="shuffledList[0]"
          :list="shuffledList"
        />

        
      </div>
      <div class="page-wrap">
        <el-pagination
          @current-change="pageChange"
          :page-size="12"
          background
          layout="prev, pager, next, jumper"
          :total="count">
        </el-pagination>
      </div>
    </el-card> -->

    <div class="extra" @click="$router.push('/netease')">网易云音乐扩展
      <svg-icon icon-class="music"></svg-icon>
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
      this.$axios.get('/music',{pn:this.pn,size:12}).then(res => {
        this.isShow = false
        if (res.code == 200) {
          this.musicData = res.data
          this.count = res.count
        }
        this.isShow = true
      })
    },
    pageChange (page) {
      this.pn = page;
      this.getMusicData()
    }
  },
  created() {
    this.getMusicData()
  },
  computed: {
    shuffledList () {
      return this.musicData
    }
  }
}
</script>

<style scoped>
.extra {
  cursor: pointer;
  position: absolute;
  padding: 5px;
  top: 50%;
  right: 0;
  width: 16px;
  color: #a09e9e;
  border: 1px solid #a09e9e;
  border-right: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

</style>
