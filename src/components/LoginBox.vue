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

          <el-dialog title="修改个人信息" :visible.sync="showDialog" style="text-align: left;">
            <div style="margin-bottom: 15px;">
              头像:
              <upload v-model="avatar"></upload>
            </div>
            <div style="margin-bottom: 15px;">
              <span style="margin-right: 15px;">用户名:</span> 
              <el-input v-model="username" style="width: 80%" size="medium"></el-input>
            </div>
            <div style="margin-bottom: 15px;">
              <span style="margin-right: 15px;">邮<span style="opacity: 0">由</span>箱:</span>
              <el-input v-model="email" style="width: 80%" size="medium"></el-input>
            </div>
            <div style="margin-bottom: 15px;">
              <span style="margin-right: 15px;">个<span style="opacity: 0">个</span>签:</span>
              <el-input v-model="desc" style="width: 80%" size="medium"></el-input>
            </div>
            <div class="btn" style="width: 30%;margin: 0 auto;">
              <el-button type="danger" size="mini" style="width: 100%" @click="modify">修改</el-button>
            </div>
          </el-dialog>
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
import {mapState} from 'vuex'

export default {
  name:'',
  data() {
    return {
      formData:{
        tel:'',
        password:''
      },
      showDialog: false,
      avatar: '',
      username: '',
      email: '',
      desc: ''
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
        this.showDialog = true
        this.$axios.get(`/user/${this.$store.state.userInfo.id}`).then(res => {
          this.avatar = res.data.avatar
          this.username = res.data.username
          this.email = res.data.email
          this.desc = res.data.desc
        })
      } else if (command == 2) {
        this.$axios.delete('/logout').then(res => {
          let userInfo = {
            id: '',
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
    },
    modify () {
      if (this.avatar && this.username && this.email && this.desc) {
        this.$axios.put('/user/userEdit', {avatar: this.avatar, username: this.username, email: this.email, desc: this.desc}).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.showDialog = false
            let userInfo = {
              id: res.data.id,
              avatar: res.data.avatar,
              email: res.data.email,
              username: res.data.username,
              tel: res.data.tel,
              level: res.data.level
            }
            this.$store.commit('CHANGE_userInfo', userInfo)
          } else {
            this.$message.error('数据请求有误')
          }
        })
      } else {
        this.$message.info('数据填写不完整哦亲')
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
