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
    <div class="w960 reglog">
      <div class="left-content">
        <h2><i class="left-border"></i>用户注册与登录</h2>
        <p>1、首先，您要先进行注册，在登陆按钮图标的下方，请点击它，即可进行注册。
        </p>
        <p>2、登陆，直接点击登陆/注册图标，输入您的用户名与密码即可进行登陆，登陆后方可发表留言、订购套餐等。
        </p>
        <p>3、找回密码，在您忘记了密码或者丢失了密码的情况下，请点击忘记密码，进行相应的操作，您将可以获得密码。
        </p>
      </div>
      <div class="right-content">
        <img src="/static/imgs/poster1.jpg">
      </div>
    </div>
    <div class="w960 recommend">
      <div class="left-content">
        <img src="/static/imgs/poster2.jpg">
      </div>
      <div class="right-content">
        <h2><i class="left-border"></i>会员推荐歌曲</h2>
        <p>
          会员推荐音乐主要是推荐优质音乐给本酒吧。
        </p>
        <p>
          每个会员能添加无限首歌！
        </p>
      </div>
    </div>
    <div class="w960 message">
      <div class="left-content">
        <h2><i class="left-border"></i>用户留言板</h2>
        <p>
          用户留言板主要用来收集顾客对酒吧服务的评价与改进建议等。
        </p>
        <p>
          所有用户可以根据酒吧所提供服务公正的发表留言，以提升日后酒吧服务水平。
        </p>
      </div>
      <div class="right-content">
        <img src="/static/imgs/poster3.jpg">
      </div>
    </div>
    <div class="w960 newscenter">
      <div class="left-content">
        <img src="/static/imgs/poster4.jpg">
      </div>
      <div class="right-content">
        <h2><i class="left-border"></i>新闻中心</h2>
        <p>
          新闻中心主要为使用者提供当前国际或国内要闻。
        </p>
        <p>
          用户可自行根据喜好查看新闻的详情并发表相关评论。
        </p>
      </div>
    </div>
    <div class="footer">
      <div style="margin: 0 auto;padding-top: 25px;padding-bottom: 25px;width: 570px;">
        <ul>
          <li>桃之夭夭</li>
          <li>灼灼其华</li>
          <li>之子于归</li>
          <li>宜其室家</li>
          <li>桃之夭夭</li>
          <li>有蕡其实</li>
          <li>之子于归</li>
          <li>宜其家室</li>
          <li>桃之夭夭</li>
          <li>其叶蓁蓁</li>
          <li>之子于归</li>
          <li>宜其家人</li>
        </ul>
      </div>
      <div class="copyright">
        <span>COPYRIGHT © 2018-2019    小型酒吧在线管理系统 .Inc </span>
      </div>
    </div>
    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="0" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import Swiper from '@/components/Swiper'
import LoginBox from '@/components/LoginBox'
import NewsList from '@/components/NewsList'
import MessageBoard from '@/components/MessageBoard'
import BackToTop from '@/components/BackToTop'

export default {
  name:'',
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  components: {
    Swiper,
    LoginBox,
    NewsList,
    MessageBoard,
    BackToTop
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
  margin-left:15px;
  height: 300px;
}

img{
  border-radius: 2px;
}
.reglog, .message {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  line-height: 2;
  h2 {
    font-weight: normal;
  }
  p {
    font-family: 'HYXuJingXingKaiW';
    font-size: 18px;
  }
  .left-content {
    width: 50%;
    margin: auto 10px;
  }
  .right-content {
    width: 50%;
    img {
      width: 100%;
    }
  }
}
.recommend, .newscenter {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  line-height: 1.5;
  h2 {
    font-weight: normal;
  }
  p {
    font-family: 'HYXuJingXingKaiW';
    font-size: 18px;
  }
  .left-content {
    width: 50%;
    img {
      width: 100%;
    }
  }
  .right-content {
    width: 50%;
    margin: auto 10px;
    padding-left: 25px;
    box-sizing: border-box;
  }
}
.left-border {
  display: inline-block;
  width: 4px;
  height: 30px;
  background: #ff6700;
  position: relative;
  top: 6px;
  margin-right: 15px;
}
.footer {
  background: rgba(0, 0, 0, .5);
  width: 100%;
  color:#fff;
  font-size: 14px;
  ul {
    display: flex;
    li {
      width: 15px;
      line-height: 2;
      margin-right: 35px;
      font-family: flower;
      font-size: 16px;
    }
  }
  .copyright {
    text-align: center;
    padding-bottom: 15px;
  }
}
</style>
