<template>
  <div class="wrapper w960">
    <div class="cover">
      <img :src="$route.query.img" alt="歌单封面" width="960" height="450" class="cover">
      <p class="name">{{$route.query.name}}</p>
      <svg-icon icon-class="return" class="return" @click.native="$router.back(-1)"></svg-icon>
    </div>
    <div class="title" style="font-size: 28px;">歌单详情</div>
    <ul>
      <li v-for="(item, index) in albumList" :key="index" @click="getSongDetail(item.id)">
        <p>
          {{item.name}}
        </p>
        <div>
          <span v-for="(singer, idx) in item.ar" :key="idx">{{singer.name}}  &nbsp;&nbsp;</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'',
  data() {
    return {
      albumId: '',
      albumList: []
    }
  },
  components: {

  },
  methods: {
    albumDetail () {
      axios.get(`http://120.77.46.171:3000/playlist/detail?id=${this.albumId}`).then(res => {
        this.albumList = res.data.playlist.tracks
      })
    },
    getSongDetail (id) {
      this.$bus.$emit('sendId', {id,playlist: this.albumList})
    }
  },
  created () {
    this.albumId = this.$route.query.id
    this.albumDetail()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.albumDetail()
    })
  }
}
</script>

<style scoped lang="scss">
.cover {
  position: relative;
  display: block;
}
.name {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%);
  color: #666;
  font-size: 18px;
}
.return {
  position: absolute;
  top: 10px;
  left: 15px;
  transform: scale(1.5);
  z-index: 666;
  cursor: pointer;
}
.title {
  font-family: 'HYXuJingXingKaiW';
  color: #666;
  background: #222;
  text-align: center;
  padding: 15px 0;
  margin: 0;
}
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #222;
  padding: 15px;
  box-sizing: border-box;
  li {
    width: 435px;
    padding-left: 50px;
    box-sizing: border-box;
    margin-bottom: 15px;
    font-family: 'HYXuJingXingKaiW';
    text-align: center;
    cursor: pointer;
    p {
      color: #fff;
      margin-bottom: 10px;
    }
    span {
      color: rgba(255, 255, 255, .4);
    }
  }
}
</style>
