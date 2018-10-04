<template>
  <div class="news-list">
    <div class="news-title clearfix">
      <span class="fl">酒吧新闻列表<i>Bar News</i></span>
      <img class="fr" src="/static/imgs/w_25_02.gif">
    </div>
    <div class="list-wrap">
      <ul class="list">
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
          </router-link>
        </li>
        <li class="list-item">
          <router-link to="">
            昆明百余警察凌晨出动平息酒吧群
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

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.news-list{
  width: 550px;

  .list{
    padding:0 0 10px;
    box-sizing: border-box;

    .list-item{
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      border-bottom:1px dashed #e1e1e1;
    }
    .list-item:nth-child(2n){
      background: rgba(135, 206, 235,.4) ;
    }
    a{
      text-decoration: none;
      font-size: 16px;
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
