<template>
  <div class="board-wrap w960">
    <div class="header">
      <h2 class="title">用户留言板</h2>

      <img src="/static/imgs/board-logo.jpg">
    </div>

    <div class="content">
      <ul>
        <li v-for="(item,index) in messageData" :key="index">
          <div class="content-item"> 
            <div class="top">
              <img :src="item.author.avatar" style="width: 50px;height: 50px;border-radius: 50%;margin-right: 10px" class="avatar">
              {{item.title}}
            </div>
            <p style="margin-top: 5px">{{item.content}}</p>
          </div>
          <p>发表于 <span><timer :time="item.createdTime"></timer></span></p>
        </li>
      </ul>
    </div>
    <el-card style="min-height: 405px;">
      <div slot="header">发表留言</div>
      <div class="form-wrap">
        <el-form :model="formData">
          <el-form-item label="标题">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <!-- <el-input type="textarea" v-model="formData.content" @keyup.enter.native="handlePublish"></el-input> -->
            <VueEmoji @input="onInput" width="457" style="border: none;" height="150"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="handlePublish" style="display: block;margin: 0 auto;">保存发表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    
  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'
export default {
  name:'',
  data() {
    return {
      formData: {
        title:'',
        content:''
      },
      messageData:[]
    }
  },
  components: {
    VueEmoji
  },
  methods: {
    handlePublish() {
      this.$axios.post('/message',this.formData).then(res => {
        if (res.code == 200) {
          this.formData = {
            title:'',
            content:''
          }
          this.$message.success(res.msg)
          this.getMessage()
        } else {
          this.$message.info(res.msg)
        }
      })
    },
    getMessage() {
      this.$axios.get('/message').then(res => {
        if (res.code == 200) {
          console.log(res);
          this.messageData = res.data
        }
      })
    },
    onInput (event) {
      console.log(event)
      this.formData.content = event.data
    }
  },
  created() {
    this.getMessage()
  }
}
</script>

<style scoped lang="scss">

.board-wrap{
  margin: 15px auto;
  background: #fff;
  padding-top:15px;

  .title{
    color:#555;
    font-size: 20px;
    font-weight: normal;
    margin:0 0 15px 15px;
  }

  img{
    width: 960px;
  }

  .form-wrap{
    margin: 0 auto;
    width: 500px;
    box-sizing: border-box;
  }
}
.content{
  ul{
    li:first-child {
      border-top: 1px dashed #ddd;
    }
    li{
      border-bottom:1px dashed #ddd;

      span{
        color:#409eff;
      }
    }
    .content-item{
      height: 60px;
      line-height: 1.5;
      color:#444;
      padding:10px 10px;
      box-sizing: border-box;

      .top {
        display:flex;
        align-items: center
      }
      p{
        text-indent: 26px;
        padding:5px 0;
        margin: 0;
      }
      
    }
    p{
      margin: 45px 10px 10px;
      color:#666;
      font-size: 14px;
    }
    padding:15px 30px;
  }
}
</style>
<style>
.el-textarea__inner{
  height: 150px;
}
</style>

