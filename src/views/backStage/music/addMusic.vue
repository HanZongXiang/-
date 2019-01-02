<template>
  <div class="add-music">
    <h3 class="title">添加音乐</h3>
    <div class="form-wrap">
      <el-form :model="formData">
        <el-form-item label="歌曲">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>

        <el-form-item label="歌手">
          <el-input v-model="formData.artist"></el-input>
        </el-form-item>

        <el-form-item label="歌曲链接">
          <el-input v-model="formData.src"></el-input>
        </el-form-item>

        <el-form-item label="歌手写真">
          <el-input v-model="formData.pic"></el-input>
        </el-form-item>

        <el-form-item label="歌词">
          <el-input v-model="formData.lrc" @keyup.enter.native="handleSave"></el-input>
        </el-form-item>

        <div class="btn-wrap">
          <el-button type="primary" @click="handleSave">保存添加</el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      formData: {
        title:'',
        artist:'',
        src:'',
        lrc:'',
        pic:''
      }
    }
  },
  components: {

  },
  methods: {
    handleSave() {
      this.$axios.post('/music',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          let formData = {
            title:'',
            artist:'',
            src:'',
            lrc:'',
            pic:''
          }
          this.formData = formData
        } else {
          this.$message.info(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.add-music{
  width: 550px;
  margin:0 auto;
}
.form-wrap{
  width: 500px;
  margin-top: 10px;
  padding:5px;
}
.btn-wrap{
  width: 100%;

  .el-button{
    width: 100%;
  }
}
</style>
