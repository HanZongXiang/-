<template>
  <div class="index-wrap">
    <div class="header">
      <div class="tab">
        <h2 class="index-title">后台管理</h2>
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
    </div>
    <div class="sidebar">
      <el-menu
        :router = "true"
        background-color = "#545c64"
        text-color = "#fff"
      >
        <el-submenu index="用户管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/manage/users">用户列表</el-menu-item>
            <el-menu-item index="/login">个人信息</el-menu-item>
            <el-menu-item index="/login">修改个人信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="音乐管理">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">音乐管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/">音乐列表</el-menu-item>
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
            <el-menu-item index="/">新闻详情</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        
        <el-submenu index="留言管理">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">留言管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/book">图书列表</el-menu-item>
            <el-menu-item index="/layout/book/addBook">添加图书</el-menu-item>
            <el-menu-item index="/layout/book/details">图书详情</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

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
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.index-title{
  text-align: center;
  height: 50px;
  line-height: 80px;
  font-weight: 400;
  font-size: 20px;
}
.tab{
  position:absolute;
  top:180px;
  left:200px;
  right:0;
  height: 80px;
  line-height: 1rem;
  border-bottom: 1px solid #2d3a4b;
  text-align: center;
  color:#fff;
  background-color: #2d3a4b;
  z-index: 999;
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
    transform: translateY(30%)
  }
}
.sidebar{
    width: 200px;
    position: absolute;
    height: 100vh;
    top:180px;
    bottom:0;
    left:0;
    border-right: 1px solid #f1f1f1;
    overflow: hidden;
    padding-top: 80px;
    background: #545c64;
  }
  /deep/ {
    .el-menu {
      border-right:none;
    }
  }
  .main-content{
    margin-top:80px;
    margin-left:200px;
    padding-top: 20px;
    padding-left: 10px;
  }
</style>
