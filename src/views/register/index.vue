<template>
  <div class="register-wrap w960">
    <div class="register">
      <div>
        <img src="/static/imgs/top.jpg">
      </div>
      <div class="form-wrap">
        <el-form label-width="80px" label-position="left" :model="formData">
          <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <Upload v-model="formData.avatar"></Upload>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="formData.password2"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <div class="block">
              <el-date-picker
                v-model="formData.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.tel"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <div class="btn-wrap">
            <el-button type="primary" @click="handleRegister">注册</el-button>
            <el-button type="warning">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  name:'',
  data() {
    return {
      formData: {
        avatar:'',
        username:'',
        password:'',
        password2:'',
        date:'',
        tel:'',
        email:''
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    handleRegister() {
      this.$axios.post('/register',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/index')
        } else {
          this.$message.info(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.register{
  margin-left: 25px;
  padding-top: 10px;
  padding-bottom: 15px;
  border-radius: 4px;
  width: 600px;
  background: #fff;
  height: 600px;
}
.form-wrap{
  padding:20px;
}
.btn-wrap{
  text-align: center;
}
</style>
