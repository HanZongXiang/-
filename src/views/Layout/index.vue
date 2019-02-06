<template>
  <div class="layout">
    <HeaderNav></HeaderNav>
    <div class="bg-blur" v-show="showPlayer" :style="{backgroundImage:'url(' + songDetail.picUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover'}"></div>
    <!-- 全屏播放器 -->
    <transition name="fadeplay-transform">
      <div class="player-wrapper w960" v-show="showPlayer">
        <div class="player" v-show="songName">
          <div class="song-title">
            <div class="svg-wrapper"><svg-icon icon-class="down" @click.native="toDown"></svg-icon></div>
            <div class="song-name">{{songName}}</div>
          </div>
          <div class="artist">{{singer}}</div>
          <div class="cover-lyric">
            <div class="cover-wrap" v-show="showCover">
              <img class="cover" :src="songDetail.picUrl" alt="歌曲封面" width="350" height="350" :class="playing ? 'playStart' : 'playStop'">
            </div>
            <ul id="lrc" v-show="!showCover && currentLyric.lines">
              <li v-for="(item, index) in currentLyric.lines">{{item.txt}}</li>
            </ul>
            <div style="height: 325px;text-align: center;line-height: 315px;" v-show="!showCover && !currentLyric.lines">
              纯音乐，请欣赏
            </div>
            <div class="dot-wrapper">
              <span class="dot" :class="{'active':currentShow==='cd'}" @click="showCd"></span>
              <span class="dot" :class="{'active':currentShow==='lyric'}" @click="showLrc"></span>
            </div>
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
              <img src="/static/imgs/sequence.png" width="45" @click="setLoop" v-if="mode === 0">
              <img src="/static/imgs/loop.png" width="45" v-else-if="mode === 1" @click="setRandom">
              <img src="/static/imgs/random.png" width="45" v-else @click="setSequence">
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
              <img src="/static/imgs/collect.png" v-if="!collect" @click="collectSong(currentSongId)">
            </div>
          </div>
          <!-- 音乐播放器 -->
          <audio ref="audio" src="" @canplay="playReady" @error="audioError" @timeupdate="timeUpdate" @ended="songEnd"></audio>
        </div>
      </div>
    </transition>
    

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
    <transition name="fadeview-transform">
      <router-view v-show="!showPlayer"></router-view>
    </transition>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import axios from 'axios'
import progressbar from '@/views/netease/components/progressbar'
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
      currentSongId: '',
      mode: 0,
      collect: false,
      showCover: true,
      currentShow: 'cd',
      timer: null,
      timer2: null
    }
  },
  components: {
    HeaderNav,
    progressbar
  },
  methods: {
    showLrc () {
      this.showCover = false
      this.currentShow = 'lyric'
    },
    showCd () {
      this.showCover = true
      this.currentShow = 'cd'
    },
    collectSong (id) {
      axios.get(`http://120.77.46.171:3000/login/refresh`).then(res1 => {
        console.log(res1);
      })
      axios.post(`http://120.77.46.171:3000/like?id=${id}`).then(res => {
        console.log(res.data);
      })
    },
    showPlayList () {
      this.showList = !this.showList
    },
    selectPlay (id) {
      this.currentSongId = id
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
          if (res.data.songs[0].ar.length > 1) {
            let singerArr = []
            res.data.songs[0].ar.forEach(item => {
              singerArr.push(item.name)
            })
            this.singer = singerArr.join('/')
          } else {
            this.singer = res.data.songs[0].ar[0].name
          }
        }
      })
    },
    getSongUrl (id) {
      axios.get(`http://120.77.46.171:3000/music/url?id=${id}`).then(res => {
        if (res.data.data[0].url) {
          this.songUrl = res.data.data[0].url
        } else {
          this.$message.info('歌曲暂无法播放')
          setTimeout(() => {
            this.toNextSong()
          }, 3000);
        }
      })
    },
    getSongLyric (id) {
      axios.get(`http://120.77.46.171:3000/lyric?id=${id}`).then(res => {
        if (res.data.code === 200 && res.data.lrc) {
          this.songLyric = res.data.lrc.lyric
          this.currentLyric = new Lyric(this.songLyric, this.handleLyric)
          this.lyricScroll()
        } else {
          this.currentLyric = `纯音乐，请欣赏`
        }
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    lyricScroll () {
      var __eul = document.getElementById("lrc")
      var __freq = 30; // 滚动频率（ms）
      var __fraction = 2/5; // 高亮显示行在歌词显示区域中的固定位置百分比 
      var self = this
      /**
       * 当前歌词行（lineno）滚动
       */
      var __go = function(_lineno){
        var _time;
        if (_lineno === 0) {
          _time = self.currentLyric.lines[_lineno].time;
        } else {
          _time = self.currentLyric.lines[_lineno].time - self.currentLyric.lines[_lineno-1].time;
        }
        self.timer = setTimeout(__go.bind(self, _lineno+1), _time);
        
        // 高亮下一行歌词
        if (_lineno > 0) {
          __eul.children[_lineno-1].setAttribute("class", "");
        }
        var _ep
        if (_lineno === 0) {
          _ep = document.getElementById('lrc').getElementsByTagName('li')[0]
        } else {
          _ep = __eul.children[_lineno];
        }
        _ep.setAttribute("class", "z-crt");

        // 满足需求5，6
        var _scrollTop;
        if (_ep.offsetTop < __eul.clientHeight*__fraction){
          _scrollTop = 0;
        } else if (_ep.offsetTop > (__eul.scrollHeight - __eul.clientHeight*(1-__fraction))){
          _scrollTop = __eul.scrollHeight - __eul.clientHeight;
        } else {
          _scrollTop = _ep.offsetTop - __eul.clientHeight*__fraction;
        }

        // 如用户拖动滚动条导致当前显示行超出显示区域范围，下一行直接定位到当前显示行
        if (__eul.scrollTop > (_scrollTop + __eul.clientHeight*__fraction)
          || (__eul.scrollTop + __eul.clientHeight*__fraction) < _scrollTop){
          __eul.scrollTop = _scrollTop;
        } else { // 单行滚动
          // 获取滚动步长
          var _step = Math.ceil(Math.abs(__eul.scrollTop - _scrollTop)/(_time/__freq));
          __scroll(__eul.scrollTop, _scrollTop, _step);	
        }

      };
      /**
       * 歌词单行滚动实现
       */
      var __scroll = function(_crt, _dst, _step){
        if(Math.abs(_crt - _dst) < _step){
          return;
        }
        if(_crt < _dst){
          __eul.scrollTop += _step;
          _crt += _step;
        } else {
          __eul.scrollTop -= _step;
          _crt -= _step;
        }
        self.timer2 = setTimeout(__scroll.bind(this, _crt, _dst, _step), __freq);
      };
      __go(0)
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
      document.getElementsByTagName('audio')[0].src = ''
      if (this.mode === 2) {
        this.toRandom()
      } else {
        this.toNextSong()
      }
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
      document.getElementsByTagName('audio')[0].src = ''
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
      document.getElementsByTagName('audio')[0].src = ''
      
      Array.from(document.getElementById('lrc').getElementsByTagName('li')).forEach(item => {
        item.setAttribute("className", "");
      })
      if (this.mode === 2) {
        this.toRandom()
      } else {
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
    toRandom () {
      let random = Math.floor(Math.random() * this.playlist.length)
      this.currentSongId = this.playlist[random].id
      this.getSongDetail(this.currentSongId)
      this.getSongUrl(this.currentSongId)
      this.getSongLyric(this.currentSongId)
      this.$nextTick(() => {
        this.songPlay()
      })
    },
    setLoop () {
      document.getElementsByTagName('audio')[0].loop = true
      this.mode = 1
    },
    setRandom () {
      document.getElementsByTagName('audio')[0].loop = false
      this.mode = 2
    },
    setSequence () {
      this.mode = 0
    }
  },
  computed: {
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
.bg-blur {
  width: 100vw;
  filter: blur(10px);
  position: absolute;
  top: 180px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
/* 底部轮播导航 */
.dot-wrapper {
  margin-top: 15px;
  padding-right: 15px;
}
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: rgba(230, 97, 97, 0.5);
  transition: all 0.5s;
  cursor: pointer;
}
.active {
  width: 20px;
  transition: all 0.5s;
  background: rgba(230, 97, 97, 0.5);
}
.cover-lyric {
  line-height: 1.7;
}
.cover-wrap {
  height: 290px;
  padding-bottom: 15px;
}
#lrc {
  margin-top: 15px;
  height: 310px;
  overflow-y: scroll;
  text-align: center;
  user-select: none;
  position: relative;
}
.z-crt{color:#0f0;}
.fadeplay-transform-leave-active,
.fadeplay-transform-enter-active {
  transition: all .6s;
  transition-timing-function: linear;
}
.fadeplay-transform-enter,
.fadeplay-transform-leave-active {
  opacity: 0;
  transform: translate(0, -200px);
}
.fadeview-transform-leave-active,
.fadeview-transform-enter-active {
  transition: all .6s;
  transition-timing-function: linear;
}
.fadeview-transform-enter,
.fadeview-transform-leave-active {
  opacity: 0;
  transform: translate(0, 200px);
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
  .playStart {
    animation: rotate 20s linear infinite;
  }
  .playStop {
    animation: rotate 20s linear infinite;
    animation-play-state: paused;
  }
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
        width: 85px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
.player-wrapper {
  position: relative;
  z-index: 1;
  color: rgba(29, 28, 28, .8);
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1) inset;
  text-shadow:0 0 0.2em #f87,
                -0 -0 0.2em #f87;
  .player {
    text-align: center;
  }
  .song-title {
    display: flex;
    text-align: left;
    font-family: 'HYXuJingXingKaiW';
    font-size: 30px;
    padding-bottom: 10px;
    padding-top: 36px;
    .svg-wrapper {
      margin-left: 100px;
      width: 150px;
      cursor: pointer;
    }
    .song-name {
      width: 780px;
      text-align: center;
      transform: translate(-117.5px);
    }
  }
  .cover {
    border-radius: 50%;
    width: 280px;
    height: 280px;
    border: 12px solid rgba(179, 179, 165, 0.2);
    display: block;
    margin: 20px auto 0;
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
      transform: rotate(-360deg);
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
  #lrc::-webkit-scrollbar {
    display: none;
  }
  #lrc::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    background-color: rgba(119, 137, 145, 0.7);
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
    margin-top: 5px;
    padding-bottom: 21px;
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
