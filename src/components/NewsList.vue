<template>
  <div class="news-list">
    <div class="news-title clearfix">
      <span class="fl">酒吧新闻列表<i>Bar News</i></span>
      <router-link to="/news">
        <img class="fr" src="/static/imgs/w_25_02.gif">
      </router-link>
      
    </div>
    <div class="list-wrap">
      <ul class="list">
        <li class="list-item" v-for="(item,index) in listData" :key="index">
          <router-link :to="{name:'newsDetail', params:{id:item._id}}">
            {{item.title}}
          </router-link>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      listData: []
    }
  },
  components: {

  },
  methods: {
    getNewsList() {
      this.$axios.get('/journalisms',{page_size:6}).then(res => {
        this.listData = res.data
      })
    }
  },
  created() {
    this.getNewsList()
  }
}
</script>

<style scoped lang="scss">
.news-list{
  width: 545px;

  .list{
    padding:0 0 10px;
    box-sizing: border-box;

    .list-item{
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-bottom:1px dashed #e1e1e1;
    }
    .list-item:nth-child(2n-1){
      border-left: 2px solid #ff6700;
    }
    .list-item:nth-child(2n){
      background: rgba(135, 206, 235,.4) ;
    }
    a{
      display: block;
      width: 100%;
      text-decoration: none;
      font-size: 14px;
      color:#555;
    }
    a:hover{
      color:#ff6700;
    }
  }
}
.news-title{
  box-sizing: border-box;
  border-bottom:1px solid #fff;

  span{
    height: 40px;
    line-height: 42px;
    font-size: 20px;
    font-weight: bold;
    color: #237BAF;

    i{
      font-style: normal;
      padding-left: 4px;
      font-size: 14px;
      font-weight: 500;
      color:#999;
    }
  }
  img{
    margin-top: 5px;
  }
}
</style>
