<template>
  <div class="write-note">
    <div class="main-content w960">
      <div class="title">标题</div>

      <div class="input-wrap">
        <el-input class="item" v-model="formData.title"></el-input>
      </div>

      <div class="title">内容</div>

      <quill-editor 
        v-model="formData.content"
        :options="editorOption"
      >
      </quill-editor>



      <div class="btn-wrap">
        <el-button type="primary" @click="handleSubmit">保存提交</el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import {quillEditor,Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  name:'writeNote',
  data() {
    return {
      formData: {
        title:'',
        content:''
      },
      categoryOptions:[],
      editorOption: {
        modules: {
          ImageExtend: {
            loading:true,
            name:'img',
            action:'',
            response: (res) => {
              return res.info
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    handleSubmit() {
      this.$axios.post('/journalism',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          let formData = {
            title:'',
            content:''
          }
          this.formData = formData
        } else {
          this.$message.info(res.msg)
        }
      })
    }
  },
  created() {
    
  }
}
</script>

<style scoped lang="scss">
  .main-content {
    margin-top:30px;
    background-color: #fff;
    border-radius: 6px;
    padding:30px;
    padding-top: 15px;
    box-sizing: border-box; 
    .input-wrap {
      margin-bottom: 15px;
    }
    .title {
      font-weight: bold;
      margin-bottom: 15px;
      line-height: 2;
      font-weight: 600;
      color:#444;
    }
    .category {
      color:#409eff;
      font-weight: 600;
      margin:18px 0 8px;
    }
    .category .tag {
      margin-right: 10px;
      transform: translateY(8px)
    }
    .btn-wrap {
      margin-top:15px;
    }
  }
</style>
<style>
  .ql-container {
    height: 300px;
  }
</style>