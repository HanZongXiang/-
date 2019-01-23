<template>
  <div class="wrapper w960">
    <div style="margin-top: 5px;">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :router="true"
        background-color="#555"
        text-color="#fff"
        active-text-color="#c20c0c">
        <el-menu-item index="/netease/recommend">推荐</el-menu-item>
        <el-menu-item index="/netease/singer">歌手</el-menu-item>
        <el-menu-item index="/netease/rank">排行</el-menu-item>
        <el-menu-item index="/netease/search">搜索</el-menu-item>
      </el-menu>
    </div>

    <div class="wrapper w960" v-show="showPlayer">
      <div class="player" v-show="songName">
        <div class="song-title">
          <div class="svg-wrapper"><svg-icon icon-class="down" @click.native="toDown"></svg-icon></div>
          <div class="song-name">{{songName}}</div>
        </div>
        <div class="artist">{{singer}}</div>
        <div>
          <img class="cover" :src="songDetail.picUrl" alt="歌曲封面" width="350" height="350" :class="playing ? 'playStart' : 'playStop'" v-if="showCover">
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
            <img src="/static/imgs/sequence.png" width="45">
            <!-- <img src="/imgs/random.png" alt="">
            <img src="/imgs/random.png" alt=""> -->
          </div>
          <div>
            <img src="/static/imgs/prve.png" @click="toPrevSong">
          </div>
          <div @click="togglePlaying">
            <img src="/static/imgs/playButton.png" v-if="!playing">
            <img src="/static/imgs/playStop.png" v-if="playing">
          </div>
          <div>
            <img src="/static/imgs/next.png" @click="toNextSong">
          </div>
          <div>
            <img src="/static/imgs/collect.png" alt="">
          </div>
        </div>
        <!-- 音乐播放器 -->
        <audio ref="audio" src="" @canplay="playReady" @error="audioError" @timeupdate="timeUpdate" @ended="songEnd"></audio>
      </div>
    </div>
    
    <!-- 收回的迷你播放器 -->
    <div class="mini-player clearfix" v-show="showMini" @click="toUp">
      <div class="song fl">
        <img :src="songDetail.picUrl" :class="playing ? 'playStart' : 'playStop'" width="50" height="50" class="mini-cover">
        <div class="song-detail">
          <p class="mini-name">{{songName}}</p>
          <p class="mini-artist">{{singer}}</p>
        </div>
      </div>
      <div class="operate fr">
        <div @click.stop.prevent="togglePlaying">
          <img src="/static/imgs/playStop.png" width="35" v-if="playing">
          <img src="/static/imgs/playButton.png" width="35" v-if="!playing">
        </div>
        <div>
          <img src="/static/imgs/playList.png" width="34" @click.stop.prevent="showPlayList">
        </div>
      </div>
    </div>
    <transition name="fadelist">
      <ul class="playlist" v-if="showList">
        <li v-for="(item, index) in playlist" :key="index" @click="selectPlay(item.id)">
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
    </transition>
    
    <div class="music-content" v-show="!showPlayer">
      <keep-alive include="rank,search">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import progressbar from './components/progressbar'
import Lyric from "lyric-parser"
export default {
  name:'',
  data() {
    return {
      playlist: [],
      songName: '',
      singer: '',
      songDetail: {},
      showPlayer: false,
      showMini: false,
      showList: false,
      songUrl: '',
      playing: false,
      songDuration: '',
      currentTime: '',
      songLyric: [],
      playingLyric: '', // 当前显示歌词
      showCover: true,
      currentLyric: '',
      currentLineNum: 0,
      currentSongId: ''
    }
  },
  components: {
    progressbar
  },
  methods: {
    showPlayList () {
      this.showList = !this.showList
    },
    selectPlay (id) {
      this.currentLyric = {}
      this.showList = false
      this.getSongDetail(id)
      this.getSongUrl(id)
      this.getSongLyric(id)
      this.$nextTick(() => {
        this.songPlay()
      })
    },
    getSongDetail (id) {
      axios.get(`http://120.77.46.171:3000/song/detail?ids=${id}`).then(res => {
        if (res.data.code === 200) {
          this.songDetail = res.data.songs[0].al
          this.songName = res.data.songs[0].name
          this.singer = res.data.songs[0].ar[0].name
        }
      })
    },
    getSongUrl (id) {
      axios.get(`http://120.77.46.171:3000/music/url?id=${id}`).then(res => {
        this.songUrl = res.data.data[0].url
      })
    },
    getSongLyric (id) {
      axios.get(`http://120.77.46.171:3000/lyric?id=${id}`).then(res => {
        if (res.data.code === 200 && res.data.lrc) {
          this.songLyric = res.data.lrc.lyric
          this.currentLyric = new Lyric(this.songLyric, this.handleLyric)
        } else {
          this.currentLyric = {}
        }
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    /* 播放歌曲 */
    songPlay() {
      this.$refs.audio.src = this.songUrl;
      this.$refs.audio.crossOrigin = this.anonymous;
      this.$refs.audio.play();
      this.playing = true
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
    /* 歌曲播放完毕 */
    songEnd() {
      // this.songLoop()
      // this.songUrl = ''
      // this.playing = false
      this.toNextSong()
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
    toDown () {
      this.showPlayer = false
      this.showMini = true
    },
    toUp () {
      this.showPlayer = true
      this.showMini = false
    },
    toPrevSong () {
      let songIndex = 0
      this.playlist.forEach((item, index) => {
        if (item.id === this.currentSongId) {
          if (index === 0) {
            songIndex = this.playlist[this.playlist.length - 1].id
          } else {
            songIndex = this.playlist[index - 1].id
          }
        }
      })
      this.currentSongId = songIndex
      this.getSongDetail(this.currentSongId)
      this.getSongUrl(this.currentSongId)
      this.getSongLyric(this.currentSongId)
      this.$nextTick(() => {
        this.songPlay()
      })
    },
    toNextSong () {
      let songIndex = 0
      this.playlist.forEach((item, index) => {
        if (item.id === this.currentSongId) {
          if (index === this.playlist.length - 1) {
            songIndex = this.playlist[0].id
          } else {
            songIndex = this.playlist[index + 1].id
          }
        }
      })
      this.currentSongId = songIndex
      this.getSongDetail(this.currentSongId)
      this.getSongUrl(this.currentSongId)
      this.getSongLyric(this.currentSongId)
      this.$nextTick(() => {
        this.songPlay()
      })
    }
  },
  computed: {
    activeIndex () {
      if (this.$route.path == '/netease/recommend' || this.$route.path == '/netease/albumdetail') {
        return '/netease/recommend'
      } else if (this.$route.path == '/netease/singer' || this.$route.path == '/netease/singerDetail') {
        return '/netease/singer'
      } else if (this.$route.path == '/netease/rank') {
        return '/netease/rank'
      } else if (this.$route.path == '/netease/search') {
        return '/netease/search'
      }
    },
    percent () {
      return this.currentTime / this.songDuration
    },
    playImgTxt() {
      let class2 = this.currentShow === "lyric" ? "playImg" : "";
      return `${class2}`;
    }
  },
  watch: {
    songUrl (val) {
      this.$refs.audio.src = val
    }
  },
  created () {
    this.$bus.$on('sendId', msg => {
      this.currentSongId = msg.id
      this.showPlayer = true
      this.showMini = false
      this.playlist = msg.playlist
      this.getSongDetail(msg.id)
      this.getSongUrl(msg.id)
      this.getSongLyric(msg.id)
      this.$nextTick(() => {
        this.songPlay()
      })
    })
  }
}
</script>

<style scoped lang="scss">
/deep/ {
  .el-menu {
    padding-left: 360px;
    border-bottom: none;
  }
  .el-menu--horizontal.el-menu {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
}
.fadelist-enter-active,
.fadelist-leave-active {
  transition: opacity .5s;
}
  
.fadelist-enter,
.fadelist-leave-to {
  opacity: 0;
}
.playlist {
  width: 250px;
  height: 500px;
  overflow-y: scroll;
  position: fixed;
  right: 10px;
  bottom: 75px;
  background-color: #333;
  li {
    display: flex;
    padding: 5px 5px 5px 15px;
    justify-content: space-between;
  }
  li:hover {
    color: #c20c0c;
  }
}
.playlist::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #F5F5F5;
}
.playlist::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  background-color: #665656;
}
.playlist::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  background: #fff;
} 
.mini-player {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 10px 15px;
  width: 250px;
  background-color: #333;
  .song {
    display: flex;
    align-items: center;
    .mini-cover {
      border-radius: 50%;
    }
    .song-detail {
      margin-left: 15px;
      .mini-name {
        font-size: 12px;
        width: 85px;
        color: rgb(231, 226, 226);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .mini-artist {
        font-size: 8px;
        color: rgb(170, 146, 146);
      }
    }
  }
  .operate {
    display: table;
    div {
      height: 50px;
      display: table-cell;
      vertical-align: middle;
      img {
        cursor: pointer;
        display: block;
        margin-left: 10px;
      }
    }
  }
}
.wrapper {
  .player {
    text-align: center;
  }
  .song-title {
    display: flex;
    text-align: left;
    font-family: 'HYXuJingXingKaiW';
    font-size: 30px;
    margin: 6px 0;
    .svg-wrapper {
      width: 50px;
      cursor: pointer;
    }
    .song-name {
      width: 910px;
      text-align: center;
      transform: translate(-25px);
    }
  }
  .cover {
    border-radius: 50%;
    width: 280px;
    height: 280px;
    border: 12px solid rgba(179, 179, 165, 0.2);
    display: block;
    margin: 25px auto 0;
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
