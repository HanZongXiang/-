<template>
  <div class="wrapper w960">
    <div style="margin-top: 5px;">
      <el-menu
        default-active="/netease/recommend"
        mode="horizontal"
        :router="true"
        background-color="#555"
        text-color="#fff"
        active-text-color="#409eff">
        <el-menu-item index="/netease/recommend">推荐</el-menu-item>
        <el-menu-item index="/board">歌手</el-menu-item>
        <el-menu-item index="/features">排行</el-menu-item>
        <el-menu-item index="/news">搜索</el-menu-item>
      </el-menu>
    </div>

    <div class="music-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name:'',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    
  
  },
  computed: {
  },
}
</script>

<style scoped lang="scss">
/deep/ {
  .el-menu {
    padding-left: 360px;
    border-bottom: none;
  }
  .el-menu--horizontal.el-menu {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
} 
</style>
