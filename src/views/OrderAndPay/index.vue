<template>
  <div class="w960 order-wrap">
    <div class="top">
      <div style="color: #409eff;">查看所有商品 ></div>
      <div class="cart" @click="$router.push('/cart')">购物车
        <svg-icon icon-class="cart"></svg-icon>
      </div>
    </div>
    <div class="divider"></div>
    <ul>
      <li v-for="(goods, index) in listData" :key="index">
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
            <el-button type="warning" size="mini" @click.stop="order(goods._id)">下单此商品</el-button>
            <el-button type="danger" size="mini" @click="toCart(goods._id)">加入购物车</el-button>
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

    <transition name="fade-transform">
      <div class="order-good" v-if="show">
        <div class="content">
          <div>
            商品名：{{detail.name}}
          </div>
          <div class="goods-img">
            <span>商品图：</span>
            <img :src="detail.img">
          </div>
          <div>
            标价：<span style="color: #f00;">￥{{detail.price}}</span>
          </div>
          <div>
            简介：{{detail.desc ? detail.desc : '暂无介绍'}}
          </div>
          <div>
            购买件数：<el-input-number v-model="orderGoods.nums" :min="1" :max="99" size="mini"></el-input-number>
          </div>
          <div class="btn-wrap">
            <el-button type="info" size="mini" @click="close">我再想想</el-button>
            <el-button type="danger" size="mini" @click="operate(detail._id)">确认下单</el-button>
          </div>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
        page_size: 6,
        listData: [],
        count: 0,
        show: false,
        detail: {},
        orderGoods: {
          nums: 1
        }
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
      },
      async order (id) {
        document.documentElement.style.overflow = 'hidden'
        const res = await this.$axios.get(`/goods/${id}`)
        this.show = true
        this.detail = res.data
      },
      mask () {
        document.documentElement.style.overflow = 'auto'
      },
      close () {
        this.show = false
        this.mask()
      },
      operate (id) {
        let obj = {
          product: id,
          nums: this.orderGoods.nums
        }
        this.$axios.post('/order', obj).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
          }
        })
        this.show = false
        this.mask()
      },
      toCart (id) {
        this.$axios.post('/cart', { product: id }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    created () {
      this.getGoodsList()
    }
  }
</script>

<style scoped lang="scss">
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .4s;
  transition-timing-function: linear;
}
.fade-transform-enter,
.fade-transform-leave-active {
  opacity: 0;
  transform: translate(-100px, 0);
}
.top {
  padding-top: 15px;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cart {
    color: #f00;
    cursor: pointer;
    padding: 5px;
    border-radius: 3px;
  }
  .cart:hover {
    background: rgba( 255, 0, 0, .5);
    color: #fff;
  }
}
.divider {
  width: 100%;
  height: 1px;
  background: #e1e1e1;
  margin: 8px 0 15px;
}
.order-wrap {
  border: 1px dashed #e1e1e1;
  min-height: calc(100vh - 180px);
  font-size: 13px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-left: 17px;
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
.order-good {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 10000;
  font-size: 16px;
  color: #666;
  .content {
    width: 750px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    padding: 50px;
    background: rgba(255, 255, 255, .9);
    height: 600px;
    div {
      margin-bottom: 25px;
    }
    .goods-img {
      display: flex;
      align-items: center;

      img {
        max-height: 200px;
      }
    }
  }
}
</style>