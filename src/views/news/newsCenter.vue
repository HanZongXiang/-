<template>
  <div class="news-center">
    <loading v-if="loading"></loading>
    <el-card class="w960" style="margin-top: 15px;">
      <div slot="header">
        新闻列表
      </div>
      <ul>
        <router-link :to="{name:'newsDetail', params:{id:item._id}}" 
          class="list-item" 
          v-for="(item,index) in listData"
          :key="index">
          <li class="clearfix">
            <div class="left-img fl">
              <img :src="item.img">
            </div>
            <div class="right-content">
              <div class="news-title">{{item.title}}</div>
              <div class="news-detail clearfix">
                <p class="time fl">
                  <timer :time="item.createdTime"></timer>
                </p>
                <span class="read-nums fr">
                  <img src="/static/imgs/12-eye.png">
                  {{item.readnums}}
                </span>
              </div>
            </div>
          </li>
        </router-link>
      </ul>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        listData: [],
        loading: false
      }
    },
    components: {

    },
    methods: {
      getListData() {
        this.loading = true
        this.$axios.get('/journalisms').then(res => {
          if (res.code == 200) {
            this.listData = res.data
            this.loading = false
          }
        }).catch(err => {
          this.loading = false
        })
      }
    },
    created() {
      this.getListData()
    }
  }
</script>

<style scoped lang="scss">
  .news-center {

    .list-item {

      &:first-child {
        border-top: 1px dashed #e1e1e1;
      }
      display: block;
      padding: 10px;
      height: 100px;
      text-decoration: none;
      color: #666;
      border-bottom: 1px dashed #e1e1e1;

      li {
        display: flex;
      }

      .left-img {
        display: flex;
        align-items: center;
      }

      .right-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 680px;
        height: 100px;
        margin-left: 10px;

        .news-detail {
          img {
            display: inline;
            margin-right: 7px;
          }
        }
      }
    }

    img {
      width: 150px;
      display: block;
    }

    .news-title {
      font-size: 16px;
      color: #333;
    }

    .news-detail {
      font-size: 14px;
      color: #666;

      img {
        width: 15px;
        opacity: .5;
      }
    }
  }
</style>