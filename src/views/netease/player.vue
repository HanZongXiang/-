<template>
  <div class="wrapper w960">
    <div class="player" v-show="songName">
      <div class="song-title">{{songName}}</div>
      <div class="artist">{{singer}}</div>
      <div @click="showCover = !showCover">
        <img class="cover" :src="songDetail.picUrl" alt="歌曲封面" width="350" height="350" :class="playing ? 'playStart' : 'playStop'" v-if="showCover">
        <p :class="playImgTxt" class="cd-lyric" v-if="showCover">
          {{playingLyric}}
        </p>
        <scroll class="middle-r middleTime" ref="lyricList" :data="songLyric && currentLyric.lines" v-show="!showCover">
          <div class="lyric-wrapper">
            <div v-if="currentLyric">
              <p ref="lyricLine" class="text" :class="{'current': currentLineNum === index}" v-for="(line, index) in currentLyric.lines" :key="index">{{line.txt}}</p>
            </div>
          </div>
        </scroll>
      </div>
      <!-- 播放进度条 -->
      <div class="time-box">
        <div class="time">
          <span class="time-l">{{format(currentTime)}}</span>
          <progressbar :percent="percent" @percentChange="percentChange"></progressbar>
          <span class="time-r">{{format(songDuration)}}</span>
        </div>
      </div>
      <!-- 控制按钮栏 -->
      <div class="bottom-button-box">
        <div class="mode-wrap">
          <img src="/static/imgs/random.png" alt="">
          <!-- <img src="/imgs/random.png" alt="">
          <img src="/imgs/random.png" alt=""> -->
        </div>
        <div>
          <img src="/static/imgs/prve.png" alt="">
        </div>
        <div @click="togglePlaying">
          <img src="/static/imgs/playButton.png" v-if="!playing">
          <img src="/static/imgs/playStop.png" v-if="playing">
        </div>
        <div>
          <img src="/static/imgs/next.png" alt="">
        </div>
        <div>
          <img src="/static/imgs/collect.png" alt="">
        </div>
      </div>
      <!-- 音乐播放器 -->
      <audio ref="audio" src="" loop @canplay="playReady" @error="audioError" @timeupdate="timeUpdate" @ended="songEnd"></audio>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import progressbar from './components/progressbar'
import Lyric from "lyric-parser"
import scroll from './components/scroll'
export default {
  name:'player',
  data() {
    return {
      songDetail: {},
      songName: '',
      singer: {},
      songUrl: '',
      playing: false,
      songDuration: '',
      currentTime: '',
      songLyric: [],
      playingLyric: '', // 当前显示歌词
      showCover: true,
      currentLyric: '',
      currentLineNum: 0
    }
  },
  components: {
    progressbar,
    scroll
  },
  methods: {
    getSongDetail () {
      axios.get(`http://120.77.46.171:3000/song/detail?ids=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.songDetail = res.data.songs[0].al
          this.songName = res.data.songs[0].name
          this.singer = res.data.songs[0].ar[0].name
        }
      })
    },
    getSongUrl () {
      axios.get(`http://120.77.46.171:3000/music/url?id=${this.$route.params.id}`).then(res => {
        this.songUrl = res.data.data[0].url
      })
    },
    getSongLyric () {
      axios.get(`http://120.77.46.171:3000/lyric?id=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.songLyric = res.data.lrc.lyric
        }
        this.currentLyric = new Lyric(this.songLyric, this.handleLyric)
        console.log(this.currentLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    /* 歌曲进度条触摸后改变歌曲播放进度 */
    percentChange(precent) {
      const currentTime = this.songDuration * precent;
      this.$refs.audio.currentTime = currentTime;
      // 歌词跟随进度条滚动
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    /* 歌曲加载成功 */
    playReady() {
      this.songDuration = this.$refs.audio.duration
      this.$refs.audio.play();
    },
    audioError() {},
    /* 音频播放时间更新 */
    timeUpdate(e) {
      this.currentTime = e.target.currentTime;
      // console.log(this.currentTime)
    },
    /* 歌曲进度条触摸后改变歌曲播放进度 */
    percentChange(precent) {
      const currentTime = this.songDuration * precent;
      this.$refs.audio.currentTime = currentTime;
      // 歌词跟随进度条滚动
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    /* 封装歌曲当前播放时间 */
    format(interval) {
      interval = interval | 0;
      var min = (interval / 60) | 0;
      var sec = interval % 60;
      if (sec.toString().length === 1) {
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    },
    /* 改变播放顺序 */
    changeMode() {
      const mode = (this.mode + 1) % 3; // 取余
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    /* 歌曲播放完毕 */
    songEnd() {
      this.songLoop()
      this.songUrl = ''
      this.playing = false
    },
    /* 单曲循环播放调会播放初始 */
    songLoop() {
      // 单曲循环播放结束歌词回到初始位置
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      this.playingLyric = txt;
    },
    /* 播放歌曲 */
    songPlay() {
      this.$refs.audio.src = this.songUrl;
      this.$refs.audio.crossOrigin = this.anonymous;
      this.$refs.audio.play();
      this.playing = true
    },
    /* 旋转头像歌词左右滑动 */
    middleTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    /* 播放按钮点击 */
    togglePlaying() {
      // 停止/播放当前歌词播放
      if (this.playing) {
        this.playing = false
        this.$refs.audio.pause()
        this.currentLyric.stop()
      } else {
        this.playing = true
        this.$refs.audio.play()
        this.currentLyric.play()
      }
    },
  },
  watch: {
    songUrl (val) {
      this.$refs.audio.src = val
    }
  },
  created () {
    this.getSongDetail()
    this.getSongUrl()
    this.getSongLyric()
    this.$nextTick(() => {
      this.songPlay()
    })
  },
  mounted () {
    
  },
  computed: {
    percent () {
      return this.currentTime / this.songDuration
    },
    playImgTxt() {
      let class2 = this.currentShow === "lyric" ? "playImg" : "";
      return `${class2}`;
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  text-align: center;
  .song-title {
    font-family: 'HYXuJingXingKaiW';
    font-size: 30px;
    margin: 6px 0;
  }
  .cover {
    border-radius: 50%;
    width: 280px;
    height: 280px;
    border: 12px solid rgba(179, 179, 165, 0.2);
    display: block;
    margin: 10px auto 0;
    transition: all 0.5s;
  }
  .cd-lyric {
    margin-top: 15px;
    font-family: "flower";
    font-size: 18px;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    0% {
      transform: rotate(360deg);
    }
  }
  .playStart {
    animation: rotate 20s linear infinite;
  }
  .playStop {
    animation: rotate 20s linear infinite;
    animation-play-state: paused;
  }
  /* 播放进度条 */
  .time-box {
    width: 960px;
    position: absolute;
    bottom: 60px;
    border-radius: 2px;
  }
  .time {
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .time span {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #555;
  }
  .time-l {
    padding-left: 15px;
    padding-right: 20px;
  }
  .time-r {
    padding-left: 25px;
  }

  .lyric-wrapper {
    width: 100%;
    height: 345px;
    margin: 10px auto;
    overflow-y: scroll;
    text-align: center;
  }
  .lyric-wrapper::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: #F5F5F5;
  }
  .lyric-wrapper::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    background-color: rgba(119, 137, 145, 0.7);
  }
  .lyric-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    background: #fff;
  }
  .text {
    line-height: 32px;
    color: hsla(0, 3%, 6%, 0.5);
    font-size: 14px;
    overflow: hidden;
  }
  .current {
    color: rgb(255, 205, 50);
    font-size: 16px;
  }
  

  .bottom-button-box {
    display: flex;
    width: 920px;
    position: absolute;
    bottom: 5px;
    div {
      flex: 1;
      img {
        display: block;
        cursor: pointer;
        margin: 0 auto;
      }
    }
  }
}
</style>
