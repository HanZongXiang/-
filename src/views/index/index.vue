<template>
  <div class="index">
    <div class="content w960 clearfix">
      <Swiper class="fl"></Swiper>
      <LoginBox class="fr"></LoginBox>
    </div>
    <div class="wrap w960 clearfix">
      <div class="news-wrap fl">
        <NewsList></NewsList>
      </div>
      <div class="board-wrap fl">
        <MessageBoard></MessageBoard>
      </div>
    </div>
    <div class="w960">
      <img src="/static/imgs/long.jpg" style="vertical-align:middle">
    </div>
    <div class="help w960">
      <h4>用户注册与登录</h4>
      <div class="help-detail">
        <p>1、首先，您要先进行注册，在登陆按钮图标的下方，请点击它，即可进行注册。
        </p>
        <p>2、登陆，直接点击登陆/注册图标，输入您的用户名与密码即可进行登陆，登陆后方可发表留言、订购套餐等。

        </p>
        <p>3、找回密码，在您忘记了密码或者丢失了密码的情况下，请点击忘记密码，进行相应的操作，您将可以获得密码。
        </p>
      </div>
      <h4>留言板的使用</h4>
      <div class="help-detail">
        <p>
          当您进行了登陆后，点击留言板，即可进行留言，在留言过程中，请仔细填写留言信息。留言请遵守本国国家法律法规，请勿使用谩骂、诋毁等来进行对他人的人身攻击。
        </p>
        <p>
          如果要投诉本酒吧的服务请利用站内邮件发邮件给管理员。详情请看“站内邮件的使用方法”。
        </p>
      </div>
      <h4>会员推荐音乐</h4>
      <div class="help-detail">
        <p>
          会员推荐音乐主要是会员把好的音乐推荐给本酒吧。
        </p>
        <p>
          每个会员能添加无限首歌！
        </p>
      </div>
      <h4>站内邮件使用</h4>
      <div class="help-detail">
        <p>1、站内邮件只可以在站内发送和使用，不能发送站外邮件。</p>
        <p>2、发送站内邮件必须知道对方的用户名 。</p>
      </div>
    </div>
    <div class="footer">
      <span>COPYRIGHT © 2018-2019    小型酒吧在线管理系统 .Inc </span>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import LoginBox from '@/components/LoginBox'
import NewsList from '@/components/NewsList'
import MessageBoard from '@/components/MessageBoard'

export default {
  name:'',
  data() {
    return {

    }
  },
  components: {
    Swiper,
    LoginBox,
    NewsList,
    MessageBoard
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.news-wrap{
  width: 550px;
  padding:10px;
  box-sizing: border-box;
}

.board-wrap{
  margin-left:20px;
}

img{
  border-radius: 2px;
}
.help{
  h4{
    height: 30px;
    padding: 0 10px 0 10px;
    line-height: 30px;
    font-weight: normal;
    font-size: 14px;
    background-color: #409eff;
    color: #000;
    border-bottom: 1px solid #cde99f;
  }
  .help-detail{
    background-color: #171B20;
    color: #fff;
    padding-left:10px;

    p{
      height: 45px;
      font-size: 12px;
      line-height: 45px;
    }
  }
}
.footer{
  background: url("/static/imgs/topnav_bg.gif") repeat-x center center;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color:#fff;
  font-size: 14px;
  margin-top: -3px;
  margin-bottom: -4px;
}
</style>
