<template>
  <div style="overflow-x: hidden;" class="row-wrap">
    <el-row>
      <div class="sidebar" :style="!opened ? 'width: 200px' : 'width: 65px;'">
        <hamberger :toggle-click="toggleSidebar" :is-active="!opened" class="menu-operate"></hamberger>
        <el-menu
          :router = "true"
          background-color = "#545c64"
          text-color = "#fff"
          :collapse="opened"
          @open = "handleOpen"
          @close = "handleClose"
          @select = "handleSelect"
        >
          <el-submenu index="用户管理">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/users">用户列表</el-menu-item>
              <el-menu-item index="/manage/personInfo">个人信息</el-menu-item>
              <el-menu-item index="/manage/userPlay">用户玩耍</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="音乐管理">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">音乐管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/musicList">音乐列表</el-menu-item>
              <el-menu-item index="/manage/addMusic">添加音乐</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="新闻管理">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">新闻管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/journalismsList">新闻列表</el-menu-item>
              <el-menu-item index="/manage/addJournalisms">添加新闻</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          
          <el-submenu index="留言管理">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">留言管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/mesList">留言列表</el-menu-item>
              <el-menu-item index="/board">添加留言</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="商品管理">
            <template slot="title">
              <i class="el-icon-printer"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/goods">商品列表</el-menu-item>
              <el-menu-item index="/manage/addGoods">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </div>

      <div class="container-wrap">
        <div class="tab" :style="!opened ? 'left: 200px;' : 'left: 65px;'">
          <h2 class="index-title">后台管理{{title}}</h2>
          <div class="user-center">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img :src="userInfo.avatar" class="img">
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
                <el-dropdown-item command="2">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        
        <div class="main-content" :style="!opened ? 'margin-left: 200px;' : 'margin-left: 65px;'">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
      
    </el-row>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Hamberger from '../../components/Hamberger'

export default {
  name:'',
  data() {
    return {
      opened: false,
      title: ''
    }
  },
  components: {
    Hamberger
  },
  methods: {
    toggleSidebar () {
      this.opened = !this.opened
    },
    handleOpen (key,keyPath) {
      this.title = ` > ${key}`
    },
    handleClose (key,keyPath) {
      this.title = ''
    },
    handleSelect (key,keyPath) {
      this.title = ` > ${keyPath[0]}`
    }
  },
  beforeRouteUpdate(to,form,next) {
    this.path = to.path
    if (to.meta.title) {
      this.text = ` > ${to.meta.title}`
      this.title = this.title + this.text
    }
    next()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    path () {
      this.title = this.text
    }
  }
}
</script>

<style scoped lang="scss">
.menu-operate {
  text-align: center;
}
.row-wrap::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.row-wrap::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: rgba(177, 126, 126, 0.3);
}
.row-wrap::-webkit-scrollbar-track {
  border-radius: 0;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .8s;
  transition-timing-function: linear;
}
.fade-transform-enter,
.fade-transform-leave-active {
  opacity: 0;
  transform: translate(-100px, 0);
}
.index-title{
  text-align: center;
  height: 50px;
  line-height: 80px;
  font-weight: 400;
  font-size: 20px;
}
.tab{
  position:absolute;
  top:0;
  right:0;
  height: 80px;
  line-height: 1rem;
  border-bottom: 1px solid #2d3a4b;
  text-align: center;
  color:#fff;
  background-color: #2d3a4b;
  z-index: 999;
  transition: all .3s;
  .user-center{
    position: absolute;
    top:0;
    right:20px;
    z-index: 1000;
  }
  .img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
    transform: translateY(25%);
  }
}
.sidebar{
    position: absolute;
    min-height: 100vh;
    top:0;
    bottom:0;
    left:0;
    border-right: 1px solid #f1f1f1;
    overflow: hidden;
    padding-top: 80px;
    background: #545c64;
    transition: all 0.3s;
  }
  /deep/ {
    .el-menu {
      border-right:none;
    }
  }
  .main-content{
    margin-top:80px;
    padding-top: 20px;
    padding-left: 10px;
    min-height: calc(100vh - 180px);
    transition: all .3s;
  }
</style>
