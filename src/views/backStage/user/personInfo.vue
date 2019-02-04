<template>
  <div class="person-info">
    <el-card style="margin-right: 25px;">
      <div slot="header">
        <span style="font-size: 18px;margin-right: 15px;">个人信息</span>
        <el-button size="mini" type="warning" @click="handleEdit" v-if="!isEdit">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleSave" v-else>保存</el-button>
      </div>
      <ul>
        <li style="display: flex;align-items: center;">
          头像：<img :src="info.avatar" width="35" height="35">
        </li>
        <li>
          昵称：<span v-if="!isEdit">{{info.username}}</span>
              <input v-else type="text" :placeholder="info.username" v-model="info.username">
        </li>
        <li>
          邮箱：<span v-if="!isEdit">{{info.email}}</span>
              <input v-else type="text" :placeholder="info.email" v-model="info.email">
        </li>
        <li>
          电话：<span v-if="!isEdit">{{info.tel}}</span>
              <input v-else type="text" :placeholder="info.tel" v-model="info.tel">
        </li>
        <li>
          个签：<span v-if="!isEdit">{{info.desc}}</span>
              <input v-else type="text" :placeholder="info.desc" v-model="info.desc">
        </li>
        <li>
          生日：<span v-if="!isEdit">{{info.date}}</span>
              <input v-else type="text" :placeholder="info.date" v-model="info.date">
        </li>
        <li>
          密码：<span v-if="!isEdit" v-for="item in info.password.length">*</span>
          <input v-if="isEdit" type="password" v-model="info.password">
        </li>
        
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      info: '',
      isEdit: false
    }
  },
  components: {

  },
  methods: {
    getPersonInfo () {
      this.$axios.get(`/user/${this.$store.state.userInfo.id}`).then(res => {
        this.info = res.data
      })
    },
    handleEdit () {
      this.isEdit = true
    },
    handleSave () {
      this.isEdit = false
      this.$axios.put('/userEdit/withpass',this.info).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        }
        let formData = {
          username: this.info.username,
          tel: this.info.tel,
          email: this.info.email,
          id: this.$store.state.userInfo.id,
          avatar: this.$store.state.userInfo.avatar,
          level: this.$store.state.userInfo.level
        }
        this.$store.commit('CHANGE_userInfo', formData)
      })
    }
  },
  created () {
    this.getPersonInfo()
  }
}
</script>

<style scoped lang="scss">
.person-info {
  padding-right: 10px;
  li:nth-child(1) {
    border-top: 1px solid #ddd;
  }
  li {
    height: 50px;
    border-bottom: 1px solid #ddd;
    line-height: 50px;
    padding-left: 15px;
  }
  input {
    border: none;
    outline: none;
    padding: 5px 10px;
    border-bottom: 1px solid #ddd;
  }
}
</style>
