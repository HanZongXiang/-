<template>
  <div class="add-goods">
    <h3 class="title">添加商品</h3>
    <div class="form-wrap">
      <el-form :model="formData">
        <el-form-item label="商品名">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-form-item label="标价">
          <el-input-number v-model="formData.price"></el-input-number>
        </el-form-item>

        <el-form-item label="头图">
          <upload class="fl" v-model="formData.img"></upload>
        </el-form-item>

        <el-form-item label="热度">
          <el-input-number v-model="formData.heat"></el-input-number>
        </el-form-item>

        <el-form-item label="简介">
          <el-input v-model="formData.desc" @keyup.enter.native="handleSave"></el-input>
        </el-form-item>

        <div class="btn-wrap">
          <el-button type="primary" @click="handleSave" size="mini">保存添加</el-button>
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
        name:'',
        price:'',
        img:'',
        heat:'',
        desc:''
      }
    }
  },
  components: {

  },
  methods: {
    handleSave() {
      this.$axios.post('/goods',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          let formData = {
            name:'',
            price:'',
            img:'',
            heat:'',
            desc:''
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
.add-goods{
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
