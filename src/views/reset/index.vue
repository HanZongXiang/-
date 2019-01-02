<template>
  <div class="wrapper">
    <div class="top">
      <el-steps :active="stepsNum" align-center>
        <el-step title="输入手机号" icon="el-icon-mobile-phone"></el-step>
        <el-step title="输入密保答案" icon="el-icon-message"></el-step>
        <el-step title="修改密码" icon="el-icon-refresh"></el-step>
      </el-steps>
    </div>
    <div v-if="stepsNum === 1" style="margin: 30px auto;">
      输入手机号码: <el-input style="width: 73%;margin-left: 5px;" size="mini" v-model="tel"></el-input>
      <el-button type="warning" size="mini" @click="query">查询</el-button>
    </div>
    <div v-if="stepsNum === 2" style="margin: 30px auto;">
      密保问题：{{userData[0].problem}}
      <span style="display: block;margin: 15px 0;height: 2px;width: 100%;"></span>
      密保答案：<el-input size="mini" placeholder="输入答案" style="width: 75%;" v-model="anwser"></el-input>
      <el-button type="danger" size="mini" @click="submit">提交</el-button>
    </div>
    <div v-if="stepsNum === 3" style="margin-left: 15px;">
      <div style="margin: 35px 0;">
        输入密码：
        <el-input size="mini" style="width: 80%;" v-model="password" type="password"></el-input>
      </div>
      <div>
        确认密码：
        <el-input size="mini" style="width: 80%;" v-model="new_password" type="password"></el-input>
      </div>
      <div style="margin-top: 40px;margin-bottom: 40px;">
        <el-button size="mini" type="danger" style="width: 92%;" @click="changePassword">确认提交</el-button>
      </div>
      <div>
        <el-button size="mini" type="warning" style="width: 92%;" @click="resetFields">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      stepsNum: 1,
      tel: '',
      userData: [],
      anwser: '',
      password: '',
      new_password: ''
    }
  },
  components: {

  },
  methods: {
    query () {
      this.$axios.get(`/forget/${this.tel}`).then(res => {
        if (res.data.length === 0) {
          this.$message.error('没有该用户')
        } else {
          this.userData = res.data
          this.stepsNum++
        }
      })
    },
    submit () {
      if (this.anwser) {
        if (this.anwser === this.userData[0].anwser) {
          this.stepsNum++
        } else {
          this.$message.error('密保答案输入有误')
        }
      } else {
        this.$message.error('请输入密保答案')
      }
    },
    changePassword () {
      let obj = {
        user: this.userData[0]._id,
        password: this.password
      }
      if (this.password === this.new_password) {
        this.$axios.post('/forget/changePass', obj).then(res => {
          if (res.code === 200) {
            this.$message.success('找回密码成功')
            this.$router.push('/')
          } else {
            this.$message.error('请求有误')
          }
        })
      } else {
        this.$message.error('两次输入密码不一致')
      }
    },
    resetFields () {
      this.password = ''
      this.new_password = ''
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 700px;
  margin-left: 18%;
  margin-top: 35px;
}
.el-step__icon {
  border-radius: 60%!important;
}
</style>
