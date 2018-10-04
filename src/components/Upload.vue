<template>
  <label class="input-wrap">
    <i class="el-icon-plus" v-if="!imgUrl"></i>
    <img :src="imgUrl" v-if="imgUrl" class="img">
    <input type="file" name="file" style="display:none" @change="uploadImg">
  </label>
</template>

<script>
import axios from 'axios'

export default {
  name:'',
  props:{
    value:{
      type:String
    }
  },
  data() {
    return {
      token:'',
      imgUrl:this.value
    }
  },
  components: {

  },
  methods: {
    getToken () {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.token = res.data.data
      })
    },
    uploadImg (event) {
      console.log(event);
      let file = event.target.files[0]
      let formData = new FormData()
      formData.append('file',file,file.name)
      formData.append('token',this.token)

      axios.post('https://upload-z1.qiniup.com',formData,{
        headers: {
          'Content-Type':'multipart/form-data'
        }
      }).then(res => {
        console.log(res.data.url);
        this.imgUrl = res.data.url
        this.$emit('success',res.data.url)
        this.$emit('input',res.data.url)
        this.$emit('change',res.data.url)
      })
    }
  },
  watch: {
    value (val) {
      this.imgUrl = val
    }
  },
  created() {
    this.getToken()
  }
}
</script>

<style scoped lang="scss">
  .input-wrap{
    position:relative;
    display:block;
    width: 100px;
    height: 100px;
    border: 1px dashed #e8e8e8;
    border-radius: 6px;
    cursor: pointer;

    .el-icon-plus{
      font-size: 20px;
      color:#666;
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%)
    }

    .img{
      width: 100%;
      height: 100%;
      display:block;
    }
  }
</style>
