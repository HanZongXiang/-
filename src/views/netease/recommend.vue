<template>
  <div class="wrapper">
    <div class="carousel">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img :src="item.picUrl" width="960">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="album">
      <div class="top">
        <div class="left">
          热门推荐: <div class="select" @click.prevent.stop="showModal = !showModal">选择分类 
            <svg-icon icon-class="dropdown">
            </svg-icon>
            <span v-if="playingCat" style="color: #c20c0c">&nbsp;&nbsp;{{playingCat}}</span>
        </div>
        </div>
        <transition name="fade">
          <div class="all-tag" v-if="showModal">
            <div class="svg-wrap">
              <svg-icon icon-class="pullon"></svg-icon>
            </div>
            <div class="all-top">
              <span>全部风格</span>
            </div>
            <div class="category-content">
              <div class="left-category">
                <div>
                  <svg-icon icon-class="earth"></svg-icon>
                  <span>语种</span>
                </div>
                <div>
                  <svg-icon icon-class="piano"></svg-icon>
                  <span>风格</span>
                </div>
                <div>
                  <svg-icon icon-class="coffee"></svg-icon>
                  <span>场景</span>
                </div>
                <div>
                  <svg-icon icon-class="smile"></svg-icon>
                  <span>情感</span>
                </div>
                <div>
                  <svg-icon icon-class="music"></svg-icon>
                  <span>主题</span>
                </div>
              </div>
              <div class="right-detail">
                <div class="detail-item">
                  <i v-for="(item, index) in filterList(0)" :key="index" @click="topList(item.name)">{{item.name}} <span>|</span></i>
                </div>
                <div class="detail-item">
                  <i v-for="(item, index) in filterList(1)" :key="index" @click="topList(item.name)">{{item.name}} <span>|</span></i>
                </div>
                <div class="detail-item">
                  <i v-for="(item, index) in filterList(2)" :key="index" @click="topList(item.name)">{{item.name}} <span>|</span></i>
                </div>
                <div class="detail-item">
                  <i v-for="(item, index) in filterList(3)" :key="index" @click="topList(item.name)">{{item.name}} <span>|</span></i>
                </div>
                <div class="detail-item">
                  <i v-for="(item, index) in filterList(4)" :key="index" @click="topList(item.name)">{{item.name}} <span>|</span></i>
                </div>
              </div>
            </div>
            
          </div>
        </transition>
        
        <div class="right">
          <button class="hot" :class="order === 'hot' ? 'active' : ''" @click="selectOrder('hot')">热门</button>
          <button class="new" :class="order === 'new' ? 'active' : ''" @click="selectOrder('new')">最新</button>
        </div>
      </div>
      <div class="album-content">
        <ul>
          <li v-for="(item, index) in albumList" :key="index" @click="albumDetail(item.id)">
            <img :src="item.coverImgUrl" alt="歌单图片" width="230">
            <p>{{item.name}}</p>
            <span class="creator">by <i>{{item.creator.nickname}}</i></span>
            <span class="count"><svg-icon icon-class="headset" style="transform: scale(1.6); margin-right: 4px;"></svg-icon>{{item.playCount}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  name:'',
  data() {
    return {
      banner: [],
      albumList: [],
      swiperOption: {
        //设置自动播放速度
        autoplay: {
            disableOnInteraction: false,
            delay: 3000
        },
        //开启无限循环
        loop:true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      },
      categoryList: [],
      showModal: false,
      playingCat: '',
      order: 'hot'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getBannerList () {
      axios.get('http://120.77.46.171:3000/banner').then(res => {
        if (res.data.code === 200) {
          this.banner = res.data.banners
        }
      })
    },
    getAlbumList () {
      axios.get('http://120.77.46.171:3000/top/playlist').then(res => {
        if (res.data.code === 200) {
          this.albumList = res.data.playlists
          this.albumList.map((item, index) => {
            if (item.playCount > 10000) {
              item.playCount = Math.round(item.playCount / 10000) + '万'
            }
          })
        }
      })
    },
    albumDetail (id) {
      this.$router.push({name: 'albumDetail',query: {id}})
    },
    getPlayList () {
      axios.get('http://120.77.46.171:3000/playlist/catlist').then(res => {
        if (res.data.code === 200) {
          this.categoryList = res.data.sub
        }
      })
    },
    topList (name) {
      this.showModal = false
      this.playingCat = name
      axios.get(`http://120.77.46.171:3000/top/playlist?limit=50&cat=${name}`).then(res => {
        if (res.data.code === 200) {
          this.albumList = res.data.playlists
        }
      })
    },
    selectOrder (order) {
      this.order = order
      if (!this.playingCat) {
        axios.get(`http://120.77.46.171:3000/top/playlist?limit=50&order=${order}`).then(res => {
          this.albumList = res.data.playlists
        })
      } else {
        axios.get(`http://120.77.46.171:3000/top/playlist?limit=50&order=${order}&cat=${this.playingCat}`).then(res => {
          this.albumList = res.data.playlists
        })
      }
    }
  },
  created () {
    this.getBannerList()
    this.getAlbumList()
    this.getPlayList()
  },
  computed: {
    filterList () {
      return function (flag) {
        if (flag === 0) {
          return this.categoryList.filter((item, index) => {
            return item.category === 0
          })
        } else if (flag === 1) {
          return this.categoryList.filter((item, index) => {
            return item.category === 1
          })
        } else if (flag === 2) {
          return this.categoryList.filter((item, index) => {
            return item.category === 2
          })
        } else if (flag === 3) {
          return this.categoryList.filter((item, index) => {
            return item.category === 3
          })
        } else if (flag === 4) {
          return this.categoryList.filter((item, index) => {
            return item.category === 4
          })
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
.fade-enter-active {
  transition: all 0.5s
}
.fade-leave-active {
  transition: all 0s
}
.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: translate(0, -10px);
}
.top {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 2px solid #c20c0c;
  position: relative;

  .left {
    display: flex;
    align-items: center;
    padding-left: 15px;

    .select {
      margin-left: 10px;
      color: #0c73c2;
      padding: 8px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      position: relative;
      z-index: 999;
      user-select: none;
    }
  }
  .all-tag {
    position: absolute;
    z-index: 666;
    top: 48px;
    left: -5px;
    width: 630px;
    height: 500px;
    background: #fff;
    border: 1px solid rgb(138, 138, 138);
    border-radius: 3px;
    box-shadow:0px 0px  10px 5px #efe8e8;
    user-select: none;
    .svg-wrap {
      color: black!important;
      position: absolute;
      top: -29px;
      left: 120px;
      font-size: 42px;
    }
    .all-top {
      padding: 15px 0 10px 15px;
      border-bottom: 1px solid #ddd;
      span {
        width: 65px;
        height: 20px;
        display: block;
        padding: 5px 10px;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        border: 1px solid #ddd;
        border-radius: 2px;
      }
    }
    .category-content {
      display: flex;
    }
    .left-category {
      display: flex;
      flex-direction: column;
      padding-top: 50px;
      padding-left: 15px;
      box-sizing: border-box;
      font-size: 24px;
      width: 160px;
      height: 442px;
      border-right: 1px solid #ddd;
      div {
        display: flex;
        align-items: center;
        margin-bottom: 50px;
        width: 86px;
        span {
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
    .right-detail {
      padding: 50px 15px 30px 15px;
      .detail-item {
        height: 20%;
        i {
          font-style: normal;
          font-size: 12px;
          cursor: pointer;
          padding-bottom: 5px;
        }
        i:hover {
          color: #ff6700;
          text-decoration: underline;
        }
        .active {
          background-color: #c20c0c;
          color: #fff;
        }
        span {
          display: inline-block;
          margin: 0 10px 0 8px;
          color: #d8d8d8;
        }
      }
    }
  }
  .right {
    padding-right: 15px;
    button {
      width: 70px;
      height: 35px;
      outline: none;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
    }
    .active {
      background: rgb(214, 18, 18);
      color: #fff;
    }
    .new {
      margin-left: -5px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .hot {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      border-right: none;
    }
  }
}
.album-content {
  margin-top: 15px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      margin-top: 15px;
      margin-bottom: 15px;
      cursor: pointer;
      img {
        border-radius: 6px;
        display: block;
        margin-right: 10px;
        height: 230px;
      }
      p {
        width: 215px;
        text-align: center;
        margin-top: 5px;
      }
      .creator {
        position: absolute;
        left: 5px;
        top: 5px;
        font-size: 12px;
        color: #999;
        i {
          color: #666;
          font-style: normal;
        }
      }
      .count {
        color: rgb(138, 132, 243);
        position: absolute;
        right: 15px;
        top: 5px;
      }
    }
  }
}
</style>
