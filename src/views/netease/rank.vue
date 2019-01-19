<template>
  <div class="rank w960">
    <div class="left-rank">
      <h3>云音乐特色榜</h3>
      <div v-for="item in featureList" :key="item.id" class="item" :class="item.name == active ?'active' : ''" @click="toggleCurrent(item.idx, item)">
        <div class="img">
          <img :src="item.coverImgUrl">
        </div>
        <div class="detail">
          <div>{{item.name}}</div>
          <div>{{item.updateFrequency}}</div>
        </div>
      </div>
      <h3 style="margin-top: 50px">全球媒体榜</h3>
      <div v-for="(items, index) in mediaList" :key="index" class="item">
        <div class="img">
          <img :src="items.coverImgUrl">
        </div>
        <div class="detail">
          <div>{{items.name}}</div>
          <div>{{items.updateFrequency}}</div>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="top">
        <div class="left-cover">
          <img :src="currentRank.coverImgUrl" v-if="featureList[0].coverImgUrl">
        </div>
        <div class="currentDesc">
          <div>{{currentRank.name}}</div>
          <div>{{currentRank.updateFrequency}}</div>
          <div style="font-size: 12px">{{new Date(currentRank.updateTime).getMonth() + 1}}月{{new Date(currentRank.updateTime).getDate()}}日 更新</div>
        </div>
      </div>
      <div class="bottom">
        <div class="top-title">
          <div>歌曲列表</div>
          <div>播放：<span style="color: #c20c0c">{{currentRank.playCount}}</span>次</div>
        </div>
        <ul class="current-list">
          <li v-for="(song, idx) in currentDetail" :key="idx" @click="songPlay(song.id)">
            <div>
              <span>{{idx + 1}}</span>
            </div>
            <div>
              <img :src="song.al.picUrl" class="song-cover">
            </div>
            <div>
              {{song.name}}
            </div>
            <div>
              {{song.ar[0].name}}
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
  name:'rank',
  data() {
    return {
      featureList: [],
      mediaList: [],
      active: '云音乐飙升榜',
      currentRank: [],
      currentDetail: []
    }
  },
  components: {

  },
  methods: {
    getTopList () {
      axios.get('http://120.77.46.171:3000/toplist').then(res => {
        if (res.data.code === 200) {
          this.featureList = res.data.list.slice(0,4)
          this.currentRank = this.featureList[0]
          this.featureList.map((item,ids) => {
            if (item.name === '云音乐飙升榜') {
              item.idx = 3
            } else if (item.name === '云音乐新歌榜') {
              item.idx = 0
            } else if (item.name === '网易原创歌曲榜') {
              item.idx = 2
            } else if (item.name === '云音乐热歌榜') {
              item.idx = 1
            }
            return item
          })
          this.mediaList = res.data.list.slice(4,)
        }
      })
    },
    getCurrentDetail () {
      axios.get('http://120.77.46.171:3000/top/list?idx=3').then(res => {
        if (res.data.code === 200) {
          this.currentDetail = res.data.playlist.tracks
        }
      })
    },
    toggleCurrent (id, item) {
      this.currentRank = item
      this.active = item.name
      axios.get(`http://120.77.46.171:3000/top/list?idx=${id}`).then(res => {
        if (res.data.code == 200) {
          this.currentDetail = res.data.playlist.tracks
        }
      })
    },
    songPlay (id) {
      this.$router.push({name: 'player', params: {id}})
    },
  },
  created () {
    this.getTopList()
    this.getCurrentDetail()
  }
}
</script>

<style scoped lang="scss">
.rank {
  border-left: 1px solid #d3d3d3;
  display: flex;
}
.left-rank {
  user-select: none;
  padding: 50px 0;
  border-right: 1px solid #d3d3d3;
  width: 32%;
  h3 {
    font-weight: normal;
    font-size: 20px;
    padding-left: 15px;
    margin-bottom: 15px;
  }
  .active {
    background: #e6e6e6;
  }
  .item {
    display: flex;
    padding: 15px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      display: block;
      margin-left: 15px;
    }
    .detail {
      margin: auto 0;
      margin-left: 15px;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
.right-content {
  width: 68%;
  border-right: 1px solid #d3d3d3;
  padding: 50px 35px 50px 50px;
  .top {
    display: flex;
    img {
      width: 150px;
      height: 150px;
      display: block;
    }
    .currentDesc{
      margin: auto 15px;
      line-height: 2.5;
    }
  }
  .bottom {
    margin-top: 50px;
    .top-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 3px solid #c20c0c;
      div:nth-child(1) {
        font-size: 30px;
        color: #333;
      }
      div:nth-child(2) {
        font-size: 16px;
        color: #888;
      }
    }
    .current-list {
      border: 1px solid #d3d3d3;
      border-top: none;
      color: #666;
      font-size: 12px;
      li {
        display: flex;
        padding: 10px;
        padding-left: 0;
        border-bottom: 1px solid #d3d3d3;
        align-items: center;
        cursor: pointer;
        div {
          flex: 1;
          text-align: center;
        }
      }
      li:hover {
        color: #c20c0c;
      }
    }
  }
}
</style>
