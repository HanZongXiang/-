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
          <input type="text" placeholder="输入评论...">
          <el-button type="primary" size="mini">评论</el-button>
        </div>
        <div class="comment-content" style="margin-top: 10px;padding-left: 60px;">
          <div class="comment-item" v-for="(item, index) in comment" :key="index">
            <div class="left-avatar">
              <div class="avatar-wrap">
                <img :src="item.avatar" class="avatar">
              </div>
            </div>
            <div class="right">
              <div class="right-content">
                <div class="name">
                  <span style="color: #333;font-size: 14px;">{{item.name}}</span>
                </div>
                <div class="comment-detail" style="color: #666;font-size: 13px;margin: 10px 0 15px;">
                  {{item.content}}
                </div>
                <div class="bottom">
                  <div style="color: #8a9aa9;font-size: 13px;">{{item.time}}</div>
                  <div style="font-size: 12px;color: #8a93a0;user-select: none;cursor: pointer;"><svg-icon icon-class="reply"></svg-icon> 回复</div>
                </div>
              </div>
              <div class="reply-wrap" v-if="item.reply.length !== 0">
                <div class="reply-content" v-for="(replyItem, idx) in item.reply" :key="idx">
                  <div class="reply-left">
                    <div class="reply-avatar">
                      <img :src="replyItem.avatar" class="avatar">
                    </div>
                  </div>
                  <div class="reply-right">
                    <div class="name">
                      <span>{{replyItem.reviewer}}</span>
                    </div>
                    <div class="comment-detail" style="color: #666;font-size: 13px;margin: 10px 0 15px;">
                      回复 <a style="color: #406599;">{{replyItem.responder}}</a>: {{replyItem.content}}
                    </div>
                    <div class="bottom">
                      <div style="color: #8a9aa9;font-size: 13px;">{{replyItem.time}}</div>
                      <div style="font-size: 12px;color: #8a93a0;user-select: none;cursor: pointer;"><svg-icon icon-class="reply"></svg-icon> 回复</div>
                    </div>
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
export default {
  name:'',
  data() {
    return {
      details:'',
      comment: [
        {
          name: '别来无恙',
          time: '3分钟前',
          content: '讲得非常好',
          avatar: 'http://pbl.yaojunrong.com/FvRdKNv1h5d0rO3ypYh8R-Foy9gH',
          reply: [
            {
              responder: '别来无恙',
              reviewer: '路人甲',
              avatar: 'http://pbl.yaojunrong.com/FnKsUTjxTcJLayg751O5v8Nt_ZtL',
              time: '两分钟前',
              content: '没毛病老铁'
            },
            {
              responder: '路人甲',
              reviewer: '路人乙',
              avatar: 'http://pbl.yaojunrong.com/FnKsUTjxTcJLayg751O5v8Nt_ZtL',
              time: '两分钟前',
              content: '双击666'
            },
            {
              responder: '路人乙',
              reviewer: '路人丙',
              avatar: 'http://pbl.yaojunrong.com/FnKsUTjxTcJLayg751O5v8Nt_ZtL',
              time: '两分钟前',
              content: '老铁牛逼'
            }
          ]
        },
        {
          name: '路人甲乙',
          time: '3分钟前',
          content: '讲得非常好1',
          avatar: 'http://pbl.yaojunrong.com/FvRdKNv1h5d0rO3ypYh8R-Foy9gH',
          reply: []
        },
        {
          name: '南柯一梦',
          time: '4分钟前',
          content: '讲得非常好2',
          avatar: 'http://pbl.yaojunrong.com/FvRdKNv1h5d0rO3ypYh8R-Foy9gH',
          reply: []
        },
        {
          name: '别来无恙a',
          time: '6分钟前',
          content: '讲得非常好3',
          avatar: 'http://pbl.yaojunrong.com/FvRdKNv1h5d0rO3ypYh8R-Foy9gH',
          reply: []
        },
      ]
    }
  },
  components: {

  },
  methods: {
    getDetails() {
      this.$axios.get(`/journalisms/${this.$route.params.id}`).then(res => {
        if (res.code == 200) {
          // console.log(res)
          this.details = res.data
        }
      })
    }
  },
  created() {
    this.getDetails()
  }
}
</script>

<style scoped lang="scss">
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
