<template>
  <div class="login-box">
    <div v-if="!userInfo.username">
      <h2 class="clearfix">
        <span>欢</span>
        <span>迎</span>
        <span>登</span>
        <span>录</span>
      </h2>
      <el-form label-width="50px" style="margin-top: 15px">
        <el-form-item label="账号">
          <el-input v-model="formData.tel" placeholder="请输入账号"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="handleLogin">
          登录
          </el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button class="btn" @click="$router.push('/register')">
          注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="user-box" v-else>
      <div class="avatar-wrap">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="userInfo.avatar" class="img">
            </span>
            <el-dropdown-menu slot="dropdown">

              <el-dropdown-item command="1">修改信息</el-dropdown-item>
              <el-dropdown-item command="3" v-if="userInfo.level == 1">后台管理</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
              
            </el-dropdown-menu>
          </el-dropdown>
      </div>
      <div class="userinfo-wrap">
        <p> 权限 : {{userInfo.level ? '管理员' : '普通用户'}}</p>
        <p> 昵称 : {{userInfo.username}}</p>
        <p> 电话 : {{userInfo.tel}}</p>
        <p> 邮箱 : {{userInfo.email}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
require('../utils/jquery.min.js')
import {mapState} from 'vuex'

export default {
  name:'',
  data() {
    return {
      formData:{
        tel:'',
        password:''
      }
    }
  },
  components: {

  },
  methods: {
    handleLogin() {
      this.$axios.post('/login',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$store.commit('CHANGE_userInfo',res.userData)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleCommand (command) {
      if (command == 1) {
        
      } else if (command == 2) {
        this.$axios.delete('/logout').then(res => {
          let userInfo = {
            avatar:'',
            email:'',
            username:'',
            tel:'',
            level:''
          }

          if (res.code == 200){
            this.$message.success(res.msg)
            this.$store.commit('CHANGE_userInfo',userInfo)  //清空vuex中存储的用户信息
            this.$router.push('/index')
          } else {
            this.$store.commit('CHANGE_userInfo',userInfo)
            this.$message.info(res.msg)
            this.$router.push('/index')
          }
        })
      } else if(command == 3) {
        this.$router.push('manage')
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
/deep/ .el-form-item__label {
  color: rgb(236, 226, 226);
}
.login-box{
  margin-top:10px; 
  width: 395px;
  height: 340px;
  border:1px solid rgb(179, 172, 172);
  border-radius: 4px;
  box-sizing: border-box;
  padding:10px;
  padding-left:0;
  background: url('http://pbl.yaojunrong.com/Ftoz-dkrsfWUlrFSsPcIvJSSLbVE') no-repeat center center;
  background-size: cover;
}
h2 {
  display: flex;
  padding-top: 20px;
  padding-left: 51px;
  justify-content: space-around;
  span{  
    float:left;  
    position: relative;  
  }
  span:nth-child(1){  
    animation:jump 1s linear 0s infinite alternate;  
  }  

  span:nth-child(2){  
    animation:jump 1s linear 0.2s infinite alternate;  
  }  

  span:nth-child(3){  
    animation:jump 1s linear 0.4s infinite alternate;  
  }  

  span:nth-child(4){  
    animation:jump 1s linear 0.6s infinite alternate;  
  }

  @keyframes jump  
  {  
    0%{  
      top:0px;  
      color:red;  
    }  
    50%{  
      top:-10px;  
      color:green;  
    }  
    100%{  
      top:10px;  
      color:blue;  
    }  
  }    
}
.btn{
  width: 100%;
}
.user-box{

  .avatar-wrap{
    text-align: center;
    margin-top:15px;

    .img{
      width: 75px;
      height: 75px;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;
      border: 2px solid #9c9b9b;
      animation:run 8s linear 0s infinite;
    }
    .img:hover {
      animation-play-state:paused;
    }
    @keyframes run{  
      from{  
        transform:rotate(0deg);  
      }  
      to{  
        transform:rotate(360deg);  
      }  
    }  
  }

  .userinfo-wrap{
    margin-top: 20px;
    margin-left: 110px;
    line-height: 3;
    color:rgb(248, 228, 228);
    p {
      transition: all 1.5s ease;
    }
    p:hover {
      animation: Glow 1.5s ease infinite alternate;
    }
    @keyframes Glow {
      from {
        text-shadow: 0 0 10px #fff,0 0 20px #fff,0 0 30px #fff,0 0 40px #00a67c,0 0 70px #00a67c,0 0 80px #00a67c,0 0 100px #00a67c,0 0 150px #00a67c;
      }
      to {
        text-shadow: 0 0 5px #fff,0 0 10px #fff,0 0 15px #fff,0 0 20px #00a67c,0 0 35px #00a67c,0 0 40px #00a67c,0 0 50px #00a67c,0 0 75px #00a67c;
      }
    }
  }
  
}
</style>
