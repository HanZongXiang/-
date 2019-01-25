<template>
  <div class="album-detail w960">
    <div class="album-left">
      <div class="top">
        <div class="left-cover">
          <img :src="albumData.coverImgUrl" alt="歌单封面">
        </div>
        <div class="right-desc">
          <div class="desc-top">
            <i></i>
            <span>{{albumData.name}}</span>
          </div>
          <div class="author-info">
            <img :src="albumData.creator.avatarUrl" width="35" height="35" style="display: inline-block;">
            <span style="color: #0c73c2;margin: 0 15px;">{{albumData.creator.nickname}}</span>
            <span>{{formatTime(albumData.createTime)}} 创建</span>
          </div>
          <div class="data-summary">
            <i>播放</i>
            <i></i>
            <i>({{albumData.subscribedCount}})</i>
            <i></i>
            <i>({{albumData.shareCount}})</i>
            <i></i>
            <i>({{albumData.commentCount}})</i>
            <i></i>
          </div>
          <div class="tags-wrap">
            标签：<span v-for="(item, index) in albumData.tags" :key="index">{{item}}</span>
          </div>
          <div class="brief-intro" :class="show === 'all' ? 'all' : ''">
            介绍：{{albumData.description}}
          </div>
          <div @click="toggle" style="color: #0c73c2;cursor: pointer">{{show !== 'all' ? '展开' : '收起'}}</div>
        </div>
      </div>
      <div class="bottom-list">
        <div class="bottom-title">
          <div class="left-title">
            <h3>歌曲列表</h3>
            <span>{{albumData.tracks.length}}首歌</span>
          </div>
          <div class="right-count">
            播放：<span>{{albumData.playCount}}</span>次
          </div>
        </div>
        <div class="table-title">
          <div></div>
          <div>歌曲标题</div>
          <div>歌手</div>
          <div>专辑</div>
        </div>
        <ul class="table-content">
          <li v-for="(item, index) in albumData.tracks" :key="index" @click="getSongDetail(item.id)">
            <div>{{index + 1}}</div>
            <div>{{item.name}}</div>
            <div>{{item.ar[0].name}}</div>
            <div>{{item.al.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="album-right">
      <div class="subscribers">
        <div class="like">喜欢这个歌单的人</div>
        <div>
          <img style="display: inline-block;margin-top: 10px;margin-right: 30px;" :src="item.avatarUrl" v-for="(item,index) in albumData.subscribers" :key="index" width="40" height="40" :title="item.nickname">
        </div>
      </div>
      <div class="hot-album">
        <div class="hot-title">
          热门歌单
        </div>
        <ul>
          <li v-for="(item, relateds) in related" :key="relateds" @click="jumpToRelated(item.id)">
            <div>
              <img :src="item.coverImgUrl" width="50" height="50">
            </div>
            <div style="margin-left: 10px;">
              <h3>{{item.name}}</h3>
              <p>by <span>{{item.creator.nickname}}</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'',
  data() {
    return {
      albumId: '',
      albumList: [],
      albumData: {},
      show: 'brief',
      related: []
    }
  },
  components: {

  },
  methods: {
    albumDetail () {
      axios.get(`http://120.77.46.171:3000/playlist/detail?id=${this.albumId}`).then(res => {
        this.albumData = res.data.playlist
        this.albumList = res.data.playlist.tracks
      })
    },
    getSongDetail (id) {
      this.$bus.$emit('sendId', {id,playlist: this.albumList})
    },
    getRelatedAlbum () {
      axios.get(`http://120.77.46.171:3000/related/playlist?id=${this.albumId}`).then(res => {
        this.related = res.data.playlists
      })
    },
    jumpToRelated (id) {
      this.$router.push({name: 'albumDetail',query: {id}})
    },
    toggle () {
      this.show === 'all' ? this.show = 'brief' : this.show = 'all'
    }
  },
  created () {
    this.albumId = this.$route.query.id
    this.albumDetail()
    this.getRelatedAlbum()
  },
  beforeRouteUpdate (to, from, next) {
    this.albumId = to.query.id
    this.albumDetail()
    this.getRelatedAlbum()
    next()
  },
  computed: {
    formatTime () {
      return function (time) {
        let year = new Date(time).getFullYear()
        let month = new Date(time).getMonth() + 1
        month >= 10 ? month : '0' + month
        let day = new Date(time).getDate()
        day >= 10 ? day : '0' + day
        return `${year}-${month}-${day}`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.album-detail {
  border-left: 1px solid #ddd;
  padding: 25px;
  display: flex;
  .album-left {
    padding-right: 25px;
    width: 640px;
  }
  .album-right {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    margin-top: -25px;
    box-sizing: border-box;
    padding: 15px 25px;
    width: 269px;
    .like {
      width: 217px;
      border-bottom: 1px solid #ccc;
      font-size: 12px;
      color: #333;
      padding-bottom: 5px;
    }
    .hot-album {
      margin-top: 35px;
      width: 217px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      .hot-title {
        border-bottom: 1px solid #ccc;
        font-size: 12px;
        color: #333;
        padding-bottom: 5px;
      }
      ul {
        li {
          display: flex;
          align-items: center;
          margin-top: 10px;
          cursor: pointer;
          h3 {
            width: 160px;
            font-size: 14px;
            font-weight: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
            span {
              color: #666;
            }
          }
        }
        li:hover {
          color: #c20c0c;
        }
      }
    }
  }
  img {
    display: block;
  }
  .top {
    display: flex;
    width: 640px;
    .left-cover {
      padding: 5px;
      border: 1px solid rgb(141, 138, 138);
      height: 200px;
      margin-right: 15px;
      img {
        width: 200px;
        height: 200px;
      }
    }
    .right-desc {
      .desc-top {
        display: flex;
        align-items: center;
        i {
          display: inline-block;
          overflow: hidden;
          width: 58px;
          height: 24px;
          background: url('https://s2.music.126.net/style/web2/img/icon.png?076dbfa2cb98f1e6ccd1a672501d1703') no-repeat 0 9999px;
          background-position: 0 -243px;
          margin-right: 10px;
        }
        span {
          font-size: 20px;
          color: #333;
          line-height: 24px;
        }
      }
      .author-info {
        display: flex;
        align-items: center;
        margin: 15px 0;
        span {
          font-size: 12px;
          color: #999;
        }
      }
      .data-summary {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        i {
          display: inline-block;
          font-style: normal;
          cursor: pointer;
          font-size: 12px;
          color: #666;
          line-height: 31px;
        }
        i:nth-child(1) {
          font-style: normal;
          line-height: 31px;
          text-align: center;
          font-size: 14px;
          width: 46px;
          height: 31px;
          padding: 0 7px 0 8px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          color: #fff;
          background-position: 0 -387px;
        }
        i:nth-child(2) {
          width: 35px;
          height: 31px;
          margin-left: -5px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          color: #fff;
          background-position: 0 -1588px;
        }
        i:nth-child(3) {
          padding-right: 20px;
          padding-left: 28px;
          margin-left: 15px;
          width: 36px;
          height: 31px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          background-position: 0 -977px;
        }
        i:nth-child(4),
        i:nth-child(6),
        i:nth-child(8) {
          width: 5px;
          height: 31px;
          margin-left: -1px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          background-position: right -1020px;
        }
        i:nth-child(5) {
          padding-right: 2px;
          padding-left: 33px;
          width: 30px;
          height: 31px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          background-position: 0 -1225px;
        }
        i:nth-child(7) {
          padding-right: 2px;
          padding-left: 33px;
          width: 30px;
          height: 31px;
          background: url('https://s2.music.126.net/style/web2/img/button2.png?d6507fa0a426b047b29608e5623e3a9c') no-repeat 0 9999px;
          background-position: 0 -1465px;
        }
      }
      .tags-wrap {
        color: #666;
        font-size: 12px;
        span {
          display: inline-block;
          padding: 2px 10px;
          height: 20px;
          border: 1px solid #ddd;
          border-radius: 15px;
          line-height: 20px;
        }
      }
      .brief-intro {
        color: #666;
        font-size: 12px;
        white-space: pre-line;
        height: 140px;
        overflow: hidden;
      }
      .all {
        height: auto;
      }
    }
  }
  .bottom-list {
    .bottom-title {
      width: 640px;
      padding-bottom: 5px;
      border-bottom: 2px solid #c20c0c;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-title {
        display: flex;
        align-items: baseline;
        h3 {
          font-size: 24px;
          font-weight: normal;
          color: #333;
        }
        span {
          font-size: 12px;
          color: #666;
          margin-left: 12px;
        }
      }
      .right-count {
        font-size: 12px;
        color: #666;
        span {
          color: #c20c0c;
        }
      }
    }
    .table-title {
      display: flex;
      width: 640px;
      div {
        height: 45px;
        border: 1px solid #ddd;
        color: #333;
        line-height: 45px;
        box-sizing: border-box;
        padding-left: 15px;
        background-color: rgb(212, 204, 204);
      }
      div:nth-child(1) {
        width: 10%;
      }
      div:nth-child(2) {
        width: 40%;
        border-left: none;
      }
      div:nth-child(3) {
        width: 30%;
        border-left: none;
      }
      div:nth-child(4) {
        width: 20%;
        border-left: none;
      }
    }
    .table-content {
      width: 638px;
      border: 1px solid #ddd;
      margin-bottom: 15px;
      li:nth-child(2n-1) {
        background-color: #f7f7f7;
      }
      li:hover {
        color: #c20c0c;
      }
      li {
        display: flex;
        color: #333;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        div:nth-child(1) {
          width: 10%;
          color: #999;
          text-align: center;
        }
        div:nth-child(2) {
          width: 40%;
          padding-left: 15px;
        }
        div:nth-child(3) {
          width: 30%;
          padding-left: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(4) {
          width: 20%;
          padding-left: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
