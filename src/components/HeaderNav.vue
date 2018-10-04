<template>
  <div class="container">
    <div class="header">
      <img src="static/imgs/header_bg.gif">
    </div>
    <div class="nav">
      <div class="line"></div>
      <el-menu
        default-active="/"
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="2">用户中心</el-menu-item>
        <el-menu-item index="3">酒吧特色</el-menu-item>
        <el-menu-item index="4">酒吧相册</el-menu-item>
        <el-menu-item index="/board">留言板</el-menu-item>
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

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>
.header{
  background: url('/static/imgs/body_bg.gif')
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
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
</style>
