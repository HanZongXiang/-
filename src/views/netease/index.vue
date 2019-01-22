<template>
  <div class="wrapper w960">
    <div style="margin-top: 5px;">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        background-color="#555"
        text-color="#fff"
        active-text-color="#c20c0c">
        <el-menu-item index="/netease/recommend">推荐</el-menu-item>
        <el-menu-item index="/netease/singer">歌手</el-menu-item>
        <el-menu-item index="/netease/rank">排行</el-menu-item>
        <el-menu-item index="/netease/search">搜索</el-menu-item>
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
    activeIndex () {
      if (this.$route.path == '/netease/recommed' || this.$route.path == '/netease/albumdetail') {
        return '/netease/recommend'
      } else if (this.$route.path == '/netease/singer' || this.$route.path == '/netease/singerDetail') {
        return '/netease/singer'
      } else if (this.$route.path == '/netease/rank') {
        return '/netease/rank'
      } else if (this.$route.path == '/netease/search') {
        return '/netease/search'
      }
    }
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
