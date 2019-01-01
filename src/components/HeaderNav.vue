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
        :router="false"
        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/" @click="$router.push('/')">首页</el-menu-item>
        <el-menu-item index="/board" @click="jumpRouter('message')">留言板</el-menu-item>
        <el-menu-item index="/features" @click="$router.push('/features')">酒吧特色</el-menu-item>
        <el-menu-item index="/news" @click="$router.push('/news')">新闻中心</el-menu-item>
        <el-menu-item index="/music" @click="$router.push('/music')">音乐专栏</el-menu-item>
        <el-menu-item index="/order" @click="jumpRouter('order')">下单 / 付款</el-menu-item>
        <el-menu-item index="/forget" @click="$router.push('/forget')">忘记密码</el-menu-item>
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
    jumpRouter (mes) {
      console.log(this.$store.state.userInfo)
      if (mes == 'message') {
        if (this.$store.state.userInfo.username) {
          this.$router.push('/board')
        } else {
          this.$message.info('登录后才能使用留言功能')
        }
      } else if (mes == 'order') {
        if (this.$store.state.userInfo.username) {
          this.$router.push('/order')
        } else {
          this.$message.info('登录后才能下单购买商品')
        }
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped lang="scss">
.header{
  background: url('/static/imgs/body_bg.gif')
}
// .isFixed{
  // position:fixed;
  // top:0;
  // z-index:9999;
  // padding-left: 20%;
  // margin:0 auto;
  // background: #222;
  // width: 100%;
// }
img{
  display:block;
  width: 960px;
  height: 120px;
  margin:0 auto;
}
.nav{
  padding-left: 18%;
  margin:0 auto;
  background: #222;
}
ul.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>