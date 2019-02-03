<template>
  <div class="test-wrap">
    <ul id="lrc">
      <li v-for="(item, index) in currentLyric.lines">{{item.txt}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Lyric from "lyric-parser"
export default {
  name:'',
  data() {
    return {
      songLyric: '',
      currentLyric: ''
    }
  },
  components: {

  },
  methods: {
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
        var _timer = setTimeout(__go.bind(self, _lineno+1), _time);
        
        // 高亮下一行歌词
        if (_lineno > 0) {
          __eul.children[_lineno-1].setAttribute("class", "");
        }
        var _ep = __eul.children[_lineno];
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
        setTimeout(__scroll.bind(this, _crt, _dst, _step), __freq);
      };

      __go(0)
    }
  },
  created () {
    this.getSongLyric(25706282)
    this.$nextTick(() => {
    })
  },
  // mounted () {
  //   this.lyricScroll()
  // }
}
</script>

<style scoped lang="scss">
.test-wrap {
  width: 400px;
  margin: 100px auto;
  line-height: 1.5;
  ul {
    height: 290px;
    overflow-y: scroll;
    text-align: center;
    user-select: none;
    position: relative;
  }
  .z-crt{color:#0f0;}
}
</style>
