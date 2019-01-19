<template>
  <div class="container">
    <div class="header">
      <p>小型酒吧在线管理系统</p>
      <div class="header-bottom">
        <span></span>
        <i>
          Mini-bar-online ManageMent System
        </i>
      </div>
    </div>
    <div class="nav">
      <div class="line"></div>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router="false"
        background-color="#222"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/index" @click="$router.push('/index')">首页</el-menu-item>
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
      searchBarFixed:0
    }
  },
  components: {

  },
  computed: {
    activeIndex () {
      if (this.$route.name == 'newsDetail') {
        return this.$route.name == 'newsDetail' ? '/news' : this.$route.path
      } else if (this.$route.path.indexOf('netease') != -1) {
        return '/music'
      } else if (this.$route.name == 'index') {
        return '/index'
      }
    }
  },
  methods: {
    handleScroll () {
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
  height: 120px;
  background: url('/static/imgs/body_bg.gif');
  text-align: center;
  p {
    font-family: 'HYXuJingXingKaiW';
    font-size: 48px;
    padding-top: 11px;
  }
  .header-bottom {
    display:flex;
    margin: 5px auto 0;
    width: 470px;
    align-items: center;
    justify-content: space-between;
    span {
      display: inline-block;
      height: 2px;
      width: 100px;
      background: #000;
    }
    i {
      font-size: 20px;
      margin-top: 5px;
      display: block;
    }
  }
}

.nav{
  background: #222;
}
ul.el-menu.el-menu--horizontal {
  border-bottom: none;
  margin: 0 auto;
  width: 645px;
}
</style>