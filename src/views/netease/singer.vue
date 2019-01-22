<template>
  <div class="singer-wrap w960">
    <div class="top">
      <h3>热门歌手</h3>
    </div>
    <ul class="singer-detail clearfix">
      <li class="first fl" v-for="(item, index) in singerList.slice(0, 5)" @click="jumpToDetail(item.id)">
        <img :src="item.img1v1Url">
        <p>{{item.name}}</p>
      </li>
      <li class="first line fl" v-for="(item, index) in singerList.slice(6, 11)" @click="jumpToDetail(item.id)">
        <img :src="item.img1v1Url">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <div class="nocover">
      <div v-for="(item, index) in singerList.slice(10,101)" @click="jumpToDetail(item.id)">
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'singer',
  data() {
    return {
      singerList: []
    }
  },
  components: {

  },
  methods: {
    getSingerList () {
      axios.get('http://120.77.46.171:3000/toplist/artist').then(res => {
        if (res.data.code === 200) {
          this.singerList = res.data.list.artists
        }
      })
    },
    jumpToDetail (id) {
      this.$router.push( `/netease/singerDetail/${id}`)
    }
  },
  created () {
    this.getSingerList()
  }
}
</script>

<style scoped lang="scss">

.top {
  height: 40px;
  border-bottom: 3px solid #c20c0c;
  h3 {
    font-size: 24px;
    margin-top: 15px;
    margin-left: 5px;
    font-weight: normal;
  }
}
ul {
  padding-bottom: 30px;
  border-bottom: 1px solid #999;
  padding-left: 13px;
  .first {
    margin-top: 15px;
    margin-right: 25px;
    cursor: pointer;
    img {
      display: block;
      width: 165px;
      height: 165;
      border: 1px solid #e1e1e1;
    }
    p {
      margin-top: 15px;
      font-size: 14px;
    }
  }
  .first:hover {
    color: #c20c0c;
  }
  .first:nth-child(10) {
    width: 154px;
  }
  .first:nth-child(5) {
    margin-right: 0;
  }
}
.nocover {
  padding-left: 15px;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px dotted #999;
  margin-bottom: 10px;
  div {
    width: 140px;
    margin: 15px;
    cursor: pointer;
    p {
      font-size: 12px;
    }
    p:hover {
      color: #c20c0c;
    }
  }
}
</style>
