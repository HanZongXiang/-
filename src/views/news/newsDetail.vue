<template>
  <div class="news-detail">
    <el-card class="w960">
      <div slot="header">新闻详情</div>
      <h3 class="news-title">{{details.title}}</h3>
      <div class="detail-content" v-html="details.content"></div>
      <div v-if="this.$store.state.userInfo.avatar">
        <div class="comment-title">评论</div>
        <div class="input-wrap">
          <img :src="this.$store.state.userInfo.avatar" class="avatar">
          <input type="text" placeholder="输入评论..." v-model="commentContent" @keyup.enter="addComment">
          <el-button type="primary" size="mini" @click="addComment">评论</el-button>
        </div>
        <div class="comment-content" style="margin-top: 10px;padding-left: 60px;">
          <div class="comment-item" v-for="(item, index) in comment" :key="index">
            <div class="left-avatar">
              <div class="avatar-wrap">
                <img :src="item.user.avatar" class="avatar">
              </div>
            </div>
            <div class="right">
              <div class="right-content">
                <div class="name">
                  <span style="color: #333;font-size: 14px;">{{item.user.username}}</span>
                </div>
                <div class="comment-detail" style="color: #666;font-size: 13px;margin: 10px 0 15px;">
                  {{item.content}}
                </div>
                <div class="bottom">
                  <div style="color: #8a9aa9;font-size: 13px;"><timer :time="item.createdTime"></timer></div>
                  <div style="font-size: 12px;color: #8a93a0;user-select: none;cursor: pointer;" @click="reply(item)"><svg-icon icon-class="reply"></svg-icon> 回复</div>
                </div>
                <transition name="fade">
                  <div style="display: flex;justify-content: space-between;margin-top: 10px;" v-if="item.editing">
                    <el-input size="mini" style="width: 91%;" v-model="replyContent"></el-input>
                    <el-button type="warning" size="mini" @click="submitReply(item)">提交</el-button>
                  </div>
                </transition>
              </div>
              <div class="reply-wrap" v-if="item.reply.length !== 0">
                <div class="reply-content" v-for="(replyItem, idx) in item.reply" :key="idx">
                  <div class="reply-left">
                    <div class="reply-avatar">
                      <user-avatar :id="replyItem.reviewer"></user-avatar>
                    </div>
                  </div>
                  <div class="reply-right">
                    <div class="name">
                      <user-info :id="replyItem.reviewer"></user-info>
                    </div>
                    <div class="comment-detail" style="color: #666;font-size: 13px;margin: 10px 0 15px;">
                      回复 <a style="color: #406599;"><user-info :id="replyItem.responder"></user-info></a>: {{replyItem.content}}
                    </div>
                    <div class="bottom">
                      <div style="color: #8a9aa9;font-size: 13px;"><timer :time="replyItem.createdTime"></timer></div>
                      <div style="font-size: 12px;color: #8a93a0;user-select: none;cursor: pointer;" @click="replyInner(replyItem)"><svg-icon icon-class="reply"></svg-icon> 回复</div>
                    </div>
                    <transition name="fade">
                      <div style="display: flex;justify-content: space-between;margin-top: 10px;" v-if="replyItem.editing">
                        <VueEmoji @input="onInput" width="457" height="0"/>
                        <!-- <el-input size="mini" style="width: 89%;" v-model="replyInnerContent"></el-input> -->
                        <el-button type="warning" size="mini" @click="innerSubmit(item, replyItem)">提交</el-button>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </el-card>
  </div>
</template>

<script>
import userInfo from '@/components/userInfo'
import userAvatar from '@/components/userAvatar'
import VueEmoji from 'emoji-vue'
export default {
  name:'',
  data() {
    return {
      replyContent: '',
      replyInnerContent: '',
      showReply: false,
      details:'',
      comment: [],
      commentContent: ''
    }
  },
  components: {
    userInfo,
    userAvatar,
    VueEmoji
  },
  methods: {
    getDetails() {
      this.$axios.get(`/journalisms/${this.$route.params.id}`).then(res => {
        if (res.code == 200) {
          this.details = res.data
        }
      })
    },
    getComment () {
      this.$axios.get(`/comment/${this.$route.params.id}`).then(res => {
        this.comment = res.data
      })
    },
    addComment () {
      if (this.commentContent === '' || this.commentContent == undefined) {
        this.$message.info('请输入评论内容')
        return
      }
      this.$axios.post('/comment', {
        content: this.commentContent,
        newsId: this.$route.params.id
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        }
      })
      this.commentContent = ''
      setTimeout(() => {
        window.location.reload()
      }, 800);
    },
    reply (item) {
      item.editing = !item.editing
    },
    replyInner (replyItem) {
      replyItem.editing = !replyItem.editing
    },
    submitReply (item) {
      let responder = item.user._id
      let content = this.replyContent
      this.$axios.post('/reply', {responder,content, commentId: item._id}).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        }
      })
      this.replyContent = ''
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
    innerSubmit (item, replyItem) {
      this.$axios.post('/reply', {responder: replyItem.reviewer,content: this.replyInnerContent, commentId: item._id}).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        }
      })
      this.replyInnerContent = ''
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    },
    onInput (event) {
      this.replyInnerContent = event.data
    }
  },
  created() {
    this.getDetails()
    this.getComment()
  },
  computed: {

  }
}
</script>

<style scoped lang="scss">
/deep/ .emoji-picker-icon{
  right: 14px;
  top: 12px;
}
.fade-enter-active {
  transition: all 0.5s
}
.fade-leave-active {
  transition: all 0s
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translate(0, -10px);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
.news-detail {
  margin-bottom: 35px;
}
.news-title {
  text-align: center;
  font-weight: normal;
  font-size: 22px;
  margin: 10px 0;
}
.comment-title {
  color: #8a9aa9;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  margin: 15px 0 30px;
}
.input-wrap {
  display: flex;
  padding: 15px 25px;
  justify-content: space-between;
  background-color: #fafbfc;
  border-radius: 3px;
  color: #888;
  input {
    width: 85%;
    border: none;
    outline: none;
    border-radius: 3px;
    padding: 0 10px;
  }
}
.comment-item {
  display: flex;
  margin-top: 15px;
  .left-avatar {
    margin-right: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #f1f1f1;
    width: 83%;
    padding-bottom: 15px;
    .right-content {
      .bottom {
        display: flex;
        justify-content: space-between;
      }
    }
    .reply-wrap {
      margin-top: 12px;
      padding: 5px 12px 12px 12px;
      background-color: #fafbfc;
      border-radius: 3px;
      .reply-content {
        display: flex;
        padding-top: 10px;
        .reply-right {
          width: 85%;
          margin-left: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f1f1;
          .bottom {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>
