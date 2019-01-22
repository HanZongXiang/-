<template>
  <div class="singer-detail">
    <div class="left" style="width: 590px;border-right: 1px solid #ddd;">
      <div class="top">
        <h3>{{artist.name}}</h3>
        <div>
          <img :src="artist.img1v1Url" width="540" height="300">
        </div>
        <ul>
          <li :class="show === 'song' ? 'active' : ''" @click="getSongList">热门作品</li>
          <li :class="show === 'album' ? 'active' : ''" @click="getAlbum">所有专辑</li>
          <li :class="show === 'mv' ? 'active' : ''" @click="getArtistMv">相关MV</li>
          <li :class="show === 'desc' ? 'active' : ''" style="border: none;" @click="getArtistDesc">艺人介绍</li>
        </ul>
      </div>
      <ul class="list-wrap" v-show="show === 'song'">
        <li v-for="(item, index) in songList" :key="index" @click="songPlay(item.id)">
          <span>{{index + 1}}</span>
          <span>{{item.name}}</span>
          <span>{{item.al.name}}</span>
        </li>
      </ul>
      <ul class="album-wrap" v-show="show === 'album'">
        <li v-for="(item, index) in albumList">
          <div class="cover-wrap">
            <img :src="item.picUrl" width="120" height="120">
          </div>
          <i class="mask"></i>
          <p>
            {{item.name}}
          </p>
          <p>
            {{formatTime(item.publishTime)}}
          </p>
        </li>
      </ul>
      <ul class="mv-wrap" v-show="show === 'mv'">
        <li v-for="(item, index) in mvList" :key="index">
          <div class="mv-cover">
            <img :src="item.imgurl">
          </div>
          <p>
            {{item.name}}
          </p>
        </li>
      </ul>
      <div class="desc-wrap" v-show="show === 'desc'">
        <div class="brief">
          <h3><i></i>{{artist.name}}简介</h3>
          <p>{{briefDesc}}</p>
        </div>
        <div class="desc-detail" v-for="(intro, idx) in descDetail" :key="idx">
          <h2 v-html="intro.ti"></h2>
          <p>{{intro.txt}}</p>
        </div>
      </div>
    </div>
    <div class="right">
      <h3>相似歌手</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'',
  data() {
    return {
      show: 'song',
      artist: {},
      songList: [],
      albumList: [],
      mvList: [],
      briefDesc: '',
      descDetail: []
    }
  },
  components: {
    
  },
  methods: {
    getSongList () {
      if (this.show != 'song') {
        this.show = 'song'
      }
      axios.get(`http://120.77.46.171:3000/artists?id=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.artist = res.data.artist
          this.songList = res.data.hotSongs
        }
      })
    },
    getAlbum () {
      this.show = 'album'
      axios.get(`http://120.77.46.171:3000/artist/album?id=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.albumList = res.data.hotAlbums
        }
      })
    },
    getArtistMv () {
      this.show = 'mv'
      axios.get(`http://120.77.46.171:3000/artist/mv?id=${this.$route.params.id}&limit=15`).then(res => {
        if (res.data.code === 200) {
          this.mvList = res.data.mvs
        }
      })
    },
    getArtistDesc () {
      this.show = 'desc'
      axios.get(`http://120.77.46.171:3000/artist/desc?id=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.briefDesc = res.data.briefDesc
          this.descDetail = res.data.introduction
        }
      })
    },
    getSimiArtist () {
      axios.get(`http://120.77.46.171:3000/simi/artist?id=${this.$route.params.id}`).then(res => {
        if (res.data.code === 200) {
          this.simiArtist = res.data
        }
      })
    },
    songPlay (id) {
      this.$router.push({name: 'player', params: {id}})
    },
  },
  created () {
    this.getSongList()
  },
  computed: {
    formatTime () {
      return function (time) {
        let date = new Date(time)
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.singer-detail {
  padding-left: 50px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  display: flex;
}
.right {
  width: 350px;
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
    padding: 35px 0 15px 35px;
    border-bottom: 1px solid #ddd;
  }
}
.top {
  h3 {
    font-size: 24px;
    font-weight: normal;
    color: #333;
    padding: 35px 0 15px 0;
  }
  img {
    display: block;
  }
  ul {
    display: flex;
    width: 538px;
    text-align: center;
    border: 1px solid #ddd;
    border-top: none;
    li {
      flex: 1;
      cursor: pointer;
      padding: 15px 0;
      border-right: 1px solid #ddd;
    }
    li.active {
      background-color: #c20c0c;
      color: #fff;
    }
  }
}
.list-wrap {
  width: 540px;
  li {
    display: flex;
    padding: 5px 15px;
    color: #666;
    font-size: 12px;
    cursor: pointer;
    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li:nth-child(2n-1) {
    background: #f7f7f7;
  }
  li:hover {
    color: #c20c0c;
  }
}
.album-wrap {
  margin-top: 20px;
  display: flex;
  width: 540px;
  flex-wrap: wrap;
  li {
    margin-bottom: 35px;
  }
  img {
    display: block;
  }
  p {
    width: 145px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 2;
  }
  .cover-wrap {
    width: 145px;
    height: 120px;
    background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?896b76822f932ba125db546de4f81991");
    background-origin: padding-box;
    background-position: -170px -850px;
    margin-right: 35px;
  }
}
.mv-wrap {
  width: 540px;
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0 30px 30px;
  li {
    margin-right: 30px;
    margin-bottom: 15px;
    div {
      width: 137px;
      height: 103px;
      background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?896b76822f932ba125db546de4f81991");
      background-origin: padding-box;
      background-position: 0px -1170px;
      img {
        display: block;
        margin-top: 1px;
        margin-left: 1px;
        width: 135px;
        height: 102px;
      }
    }
    p {
      width: 137px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
    }
  }
}
.desc-wrap {
  width: 540px;
  padding-bottom: 30px;
  .brief {
    margin-bottom: 30px;
    h3 {
      margin: 28px 0 8px 0;
      color: #333;
      font-size: 14px;
      i {
        display: inline-block;
        position: relative;
        top: 4px;
        height: 18px;
        width: 3px;
        margin-right: 7px;
        background: #c10d0c;
      }
    }
    p {
      text-indent: 2em;
      font-size: 12px;
      color: #666;
      line-height: 1.5;
    }
  }
  .desc-detail {
    white-space: pre-line;
    h2 {
      margin: 28px 0 8px 0;
      color: #333;
      font-size: 14px;
    }
    p {
      font-size: 12px;
      color: #666;
      line-height: 1.5;
    }
  }
}
</style>
