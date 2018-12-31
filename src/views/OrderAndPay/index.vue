<template>
  <div class="w960 order-wrap">
    <ul>
      <li v-for="(goods,index) in listData">
        <div class="avatar">
          <img :src="goods.img">
        </div>
        <div class="center" style="font-size: 12px;">
          <div class="left-name">
            品名：{{goods.name}}
          </div>
          <div class="right-price">
            标价：<span style="color: red;font-size: 16px;">￥{{goods.price}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="left-heat" style="line-height: 30px;">
            热度：<svg-icon icon-class="fire"></svg-icon>{{goods.heat}}
          </div>
          <div class="right-oprate">
            <el-button type="warning" size="mini">下单此商品</el-button>
            <el-button type="danger" size="mini">加入购物车</el-button>
          </div>
        </div>
      </li>
    </ul>

    <el-pagination 
      background
      @current-change="pageChange" 
      layout="prev,pager,next,jumper"
      :page-size="6" 
      :total="count">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        page_size: 6,
        listData: [],
        count: 0
      }
    },
    methods: {
      async getGoodsList () {
        const res = await this.$axios.get('/goods', {page: this.page, page_size: this.page_size})
        this.listData = res.data
        this.count = res.total
      },
      pageChange (p){
        this.page = p
        this.getGoodsList()
      }
    },
    created () {
      this.getGoodsList()
    }
  }
</script>

<style scoped lang="scss">
.order-wrap {
  padding: 15px 38px;
  padding-right: 0;
  border: 1px dashed #e1e1e1;
  min-height: calc(100vh - 180px);
  font-size: 13px;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    width: 300px;
    height: 400px;
    margin-right: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 3px;
    .avatar {
      width: 300px;
      height: 250px;
      text-align: center;
      position: relative;
      overflow: hidden;
      img {
        max-width: 100%;
        display: block;
        position: absolute;
        top: 125px;
        left: 150px;
        transform: translate(-50%, -50%);
      }
    }
    .center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30px 15px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      margin: 40px 15px;
      .right-oprate {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  li:hover {
    border-color: #ff6700;
    transform: translateY(-5px);
    box-shadow: 0 0 10px #999;
    transition: all .5s ease-out;
  }
}
</style>