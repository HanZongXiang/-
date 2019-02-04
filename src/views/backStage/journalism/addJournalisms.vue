<template>
  <div class="write-note">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/manage/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/manage/journalismsList'}">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path === '/manage/addJournalisms'">添加新闻</el-breadcrumb-item>
        <el-breadcrumb-item v-if="$route.path !== '/manage/addJournalisms'">编辑新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content w960">
      <div class="title">标题</div>

      <div class="input-wrap">
        <el-input class="item" v-model="formData.title"></el-input>
      </div>

      <div class="img-wrap">

        <div class="title">头图</div>
        <upload v-model="formData.img">

        </upload>
      </div>

      <div class="title">内容</div>

      <quill-editor 
        v-model="formData.content"
        :options="editorOption"
        @change="handleChange($event)"
      >
      </quill-editor>



      <div class="btn-wrap">
        <el-button type="primary" size="mini" @click="handleSubmit" style="display: block;margin: 0 auto;" v-if="$route.path === '/manage/addJournalisms'">保存添加</el-button>
        <el-button type="danger" size="mini" @click="handleSave" style="display: block;margin: 0 auto;" v-if="$route.path !== '/manage/addJournalisms'">保存编辑</el-button>
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
      isEdit: false,
      formData: {
        title:'',
        content:'',
        img:''
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
    },
    handleChange({quill,content,text}) {
      this.formData.contentText = text
    },
     getEditData() {
      this.$axios.get(`/journalisms/${this.$route.params.id}`).then(res => {
        if (res.code == 200) {
          this.formData = res.data
        }
      })
    },
    handleSave() {
      this.$axios.patch(`/journalism/${this.$route.params.id}`,this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/manage/journalismsList')
        } else {
          this.$message.error('未知错误')
        }
      })
    }
  },
  created() {
    if (this.$route.name == 'editJournalisms') {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    if (this.isEdit) {
      this.getEditData()
    }
  },
  watch: {
    $route(to,from) {
      if(to.name == 'newsEdit') {
        this.isEdit = true
      } else {
        this.isEdit = false
        this.formData = {
          title: '',
          content: '',
          img: ''
        }
      }
    }
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
  /deep/ .ql-container {
    height: 450px!important;
  } 
</style>