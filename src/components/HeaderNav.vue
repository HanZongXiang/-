<template>
  <div class="container">
    <div class="header">
      <img src="static/imgs/header_bg.gif">
    </div>
    <div :class="searchBarFixed == 1 ? 'isFixed' :'nav'" id="searchBar">
      <div class="line"></div>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/board">留言板</el-menu-item>
        <el-menu-item index="3">酒吧特色</el-menu-item>
        <el-menu-item index="/news">新闻中心</el-menu-item>
        <el-menu-item index="/music">音乐专栏</el-menu-item>
        <el-menu-item index="6">预定/付款</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      searchBarFixed:0,
      activeIndex: '1'
    }
  },
  components: {

  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#searchBar').offsetTop
      if ( scrollTop>offsetTop) {
        this.searchBarFixed = 1
      } else {
        this.searchBarFixed = 0
      }

    },
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.header{
  background: url('/static/imgs/body_bg.gif')
}
.isFixed{
  position:fixed;
  top:0;
  z-index:9999;
  padding-left: 289px;
  padding-right: 289px;
  margin:0 auto;
  background: #222;
  width: 100%;
}
img{
  display:block;
  width: 960px;
  height: 120px;
  margin:0 auto;
}
.nav{
  padding-left: 289px;
  padding-right: 289px;
  margin:0 auto;
  background: #222;
}
.el-menu.el-menu—horizontal {
    border-bottom: none;
}
</style>