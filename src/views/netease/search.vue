<template>
  <div class="search" style="background-color: #555;padding-top: 15px;">
    <div class="input-wrap">
      <span>
        <svg-icon icon-class="search"></svg-icon>
      </span>
      <input type="text" placeholder="输入歌手、歌名" v-model="keyword" @keyup.enter="searchSong">
    </div>
    <div style="width: 600px;margin: 15px auto;">热门搜索</div>
    <div class="hot-list">
      <span class="hot" v-for="(hot, index) in hotsList" :key="index" @click="searchHot(hot.first)">{{hot.first}}</span>
    </div>
    <ul class="list-wrap">
      <li class="list-item" v-for="(song, index) in searchList" :key="index" @click="songPlay(song.id)">
        <div>
          <span>{{index + 1}} - {{song.name}}</span>
        </div>
        <div class="singer">
          {{song.artists[0].name}}
        </div>
      </li>
    </ul>
    <div class="change-page">
      <button class="prev">prev</button>
      <button class="next active">next</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'',
  data() {
    return {
      keyword: '',
      limit: 15,
      offset: 0,
      searchList: [],
      hotsList: []
    }
  },
  components: {

  },
  methods: {
    searchSong () {
      axios.get(`http://120.77.46.171:3000/search?keywords=${this.keyword}&offset=${this.offset}&limit=${this.limit}`).then(res => {
        if (res.data.code === 200) {
          this.searchList = res.data.result.songs
        }
      })
    },
    getHotSearch () {
      axios.get('http://120.77.46.171:3000/search/hot').then(res => {
        this.hotsList = res.data.result.hots
      })
    },
    songPlay (id) {
      this.$router.push({name: 'player', params: {id}})
    },
    searchHot (key) {
      axios.get(`http://120.77.46.171:3000/search?keywords=${key}&offset=${this.offset}&limit=${this.limit}`).then(res => {
        if (res.data.code === 200) {
          this.searchList = res.data.result.songs
        }
      })
    }
  },
  created () {
    this.getHotSearch()
  }
}
</script>

<style scoped lang="scss">
.search {
  min-height: 69vh;
}
.hot-list {
  width: 600px;
  margin: 0 auto;
}
.hot {
  display: inline-block;
  margin: 0 8px 5px;
  padding: 10px 15px;
  background: #333;
  border-radius: 6px;
  cursor: pointer;
}
.input-wrap {
  margin: 0 auto;
  height: 50px;
  width: 600px;
  border: 1px solid hsla(0,0%,100%,.1);
  background: rgba(0,0,0,.3);
  border-radius: 25px;
  color: #454545;
  display: flex;
  align-items: center;
  padding: 0 15px;
  span {
    font-size: 32px;
  }
  input {
    background: none;
    border: none;
    outline: none;
    color: #fff;
    height: 80%;
    width: 85%;
    margin-left: 10px;
    font-size: 16px;
    font-family: 'fontHYQiHei';
  }
}
.list-wrap {
  width: 600px;
  margin: 20px auto 0;
  padding-bottom: 30px;
  .list-item:nth-child(1) {
    border-top: 1px solid #000;
  }
  .list-item {
    padding: 15px 10px;
    border-bottom: 1px solid #000;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
}
.change-page {
  width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 30px;
  button {
    width: 70px;
    height: 35px;
    outline: none;
    border: 1px solid #000;
    background: #333;
    cursor: pointer;
  }
  .active {
    background: #111;
    color: #fff;
  }
  .next {
    margin-left: -5px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .prev {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-right: none;
  }
}
</style>
