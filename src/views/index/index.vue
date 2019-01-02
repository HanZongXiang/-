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
    <transition name="fade">
      <div class="w960 reglog" v-show="$route">
        <div class="left-content">
          <h2><i class="left-border"></i>用户注册与登录</h2>
          <p>1、首先，您要先进行注册，在登录按钮图标的下方，请点击它，即可进行注册。
          </p>
          <p>2、登录，直接点击登录/注册图标，输入您的用户名与密码即可进行登录，登录后方可发表留言、订购套餐等。
          </p>
          <p>3、找回密码，在您忘记了密码或者丢失了密码的情况下，请点击忘记密码，进行相应的操作，您将可以获得密码。
          </p>
        </div>
        <div class="right-content">
          <img src="/static/imgs/poster1.jpg">
        </div>
      </div>
    </transition>
    
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
    <div class="canvas-wrap">
      <canvas id="canvas" width="500" height="500"></canvas>
    </div>
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
    initWatch () {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.strokeStyle = '#7FFFD4';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#7FFFD4';
      var milliseconds = 0;
      var minutes = 0;
      var hour = 0;
      var date = "";
      var ctxBack = canvas.getContext("2d");
      var numBack = canvas.getContext("2d");
      ctxBack.lineWidth = 1;
      ctxBack.shadowBlur = 0;
      ctxBack.shadowColor = '#F0F8FF';
      function pageInit() {
          showTime();
          showBack();
          drawSecPin();
          drawMinPin();
          drawHouPin();
          setPoint();
          setNum();
      }
      function setNum() {
          numBack.save();
          numBack.translate(250, 250);
          numBack.beginPath();
          numBack.fillStyle = '#7FFFD4';
          numBack.font = "30px Helvetica";
          for (var i = 0; i < 60; i++) {
              if (i % 5 == 0) {
                  numBack.lineWidth = 5;
                  var xPoint = Math.sin(i * 6 * 2 * Math.PI / 360) * 195;
                  var yPoint = -Math.cos(i * 6 * 2 * Math.PI / 360) * 195;
                  numBack.fillText(i == 0 ? 12 : i / 5, i == 0 ? -15 : xPoint - 10, i == 0 ? -185 : i <= 30 ? yPoint + 5 : yPoint + 10);
              }
          }
          numBack.stroke();
          numBack.closePath();
          numBack.restore();
      }
      function drawSecPin() {
          ctxBack.save();
          ctxBack.translate(250, 250);
          ctxBack.rotate(milliseconds / 60 * 2 * Math.PI);
          ctxBack.beginPath();
          ctxBack.strokeStyle = '#AFEEEE';
          ctxBack.lineWidth = 1;
          ctxBack.lineJoin = "bevel";
          ctxBack.miterLimit = 10;
          ctxBack.moveTo(0, 30);
          ctxBack.lineTo(3, -175);
          ctxBack.lineTo(13, -165);
          ctxBack.lineTo(0, -210);
          ctxBack.lineTo( - 13, -165);
          ctxBack.lineTo( - 3, -175);
          ctxBack.lineTo(0, 30);
          ctxBack.stroke();
          ctxBack.closePath();
          ctxBack.restore();
      }
      function drawMinPin() {
          ctxBack.save();
          ctxBack.translate(250, 250);
          ctxBack.rotate(minutes * 6 * Math.PI / 180);
          ctxBack.beginPath();
          ctxBack.strokeStyle = '#20B2AA';
          ctxBack.lineWidth = 1;
          ctxBack.lineJoin = "bevel";
          ctxBack.miterLimit = 10;
          ctxBack.moveTo(0, 20);
          ctxBack.lineTo(3, -145);
          ctxBack.lineTo(10, -135);
          ctxBack.lineTo(0, -180);
          ctxBack.lineTo( - 10, -135);
          ctxBack.lineTo( - 3, -145);
          ctxBack.lineTo(0, 20);
          ctxBack.stroke();
          ctxBack.closePath();
          ctxBack.restore();
      }
      function drawHouPin() {
          ctxBack.save();
          ctxBack.translate(250, 250);
          ctxBack.rotate(hour * 30 * Math.PI / 180);
          ctxBack.beginPath();
          ctxBack.strokeStyle = '#87CEFA';
          ctxBack.lineWidth = 1;
          ctxBack.lineJoin = "bevel";
          ctxBack.miterLimit = 10;
          ctxBack.moveTo(0, 20);
          ctxBack.lineTo(3, -110);
          ctxBack.lineTo(10, -100);
          ctxBack.lineTo(0, -150);
          ctxBack.lineTo( - 10, -100);
          ctxBack.lineTo( - 3, -110);
          ctxBack.lineTo(0, 20);
          ctxBack.stroke();
          ctxBack.closePath();
          ctxBack.restore();
      }
      function setPoint() {
          ctxBack.beginPath();
          ctxBack.fillStyle = 'black';
          ctxBack.arc(250, 250, 3, 0, 2 * Math.PI);
          ctxBack.stroke();
      }
      function showBack() {
          for (var i = 0; i < 60; i++) {
              ctxBack.save();
              ctxBack.translate(250, 250);
              ctxBack.rotate(i / 60 * 2 * Math.PI);
              ctxBack.beginPath();
              ctxBack.strokeStyle = '#7FFFD4';
              ctxBack.moveTo(0, -250);
              ctxBack.lineWidth = i % 5 == 0 ? 5 : 2;
              ctxBack.lineTo(0, -230);
              ctxBack.stroke();
              ctxBack.closePath();
              ctxBack.restore();
          }
          ctxBack.beginPath();
          ctxBack.arc(250, 250, 230, 0, 2 * Math.PI);
          ctxBack.stroke();
      }
      function degToRad(degree) {
          var result;
          var factor = Math.PI / 180;
          if (degree == 0) {
              result = 270 * factor;
          } else {
              result = degree * factor;
          }
          return result;
      }
      function showTime() {
          var now = new Date();
          var today = now.toLocaleDateString();
          var time = now.toLocaleTimeString();
          var day = now.getDay();
          var hrs = now.getHours();
          var min = now.getMinutes();
          var sec = now.getSeconds();
          var mil = now.getMilliseconds();
          var smoothsec = sec + (mil / 1000);
          var smoothmin = min + (smoothsec / 60);
          var hours = hrs + (smoothmin / 60);
          milliseconds = smoothsec;
          minutes = smoothmin;
          hour = hours;
          switch (day) {
          case 1:
              date = '一'
              break;
          case 2:
              date = '二'
              break;
          case 3:
              date = '三'
              break;
          case 4:
              date = '四'
              break;
          case 5:
              date = '五'
              break;
          case 6:
              date = '六'
              break;
          case 0:
              date = '日'
              break;
          }
          let gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
          gradient.addColorStop(0, "#03303a");
          gradient.addColorStop(1, "black");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 500, 500);
          ctx.beginPath();
          ctx.strokeStyle = '#87CEFA';
          ctx.arc(250, 250, 215, degToRad(0), degToRad((hours * 30) - 90));
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = '#20B2AA';
          ctx.arc(250, 250, 220, degToRad(0), degToRad(smoothmin * 6 - 90));
          ctx.stroke();
          ctx.beginPath();
          ctx.strokeStyle = '#AFEEEE';
          ctx.arc(250, 250, 225, degToRad(0), degToRad(smoothsec * 6 - 90));
          ctx.stroke();
          ctx.font = "25px Helvetica Bold";
          ctx.fillStyle = '#7FFFD4';
          ctx.fillText(today + "/星期" + date, 150, 230);
          ctx.font = "23px Helvetica Bold";
          ctx.fillStyle = '#7FFFD4';
          ctx.fillText(time, 190, 280);
      }
      setInterval(pageInit, 50);
    }
  },
  mounted () {
    this.initWatch()
  }
}
</script>

<style scoped lang="scss">
.canvas-wrap {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 110px;
  left: -97px;
  z-index: 666;
  border-radius: 50%;
  overflow: hidden;
  transform: scale(0.6);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
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
