<template>
  <div class="cart-wrap w960">
    <div class="top-title">
      我的购物车<svg-icon icon-class="cart" style="margin-left: 5px;"></svg-icon>
    </div>
    <div class="no-goods" v-if="goods.length == 0">
      <svg-icon icon-class="empty" style="font-size: 100px;margin-bottom: 35px;"></svg-icon>
      <br>
      <span>购物车空空如也</span>
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in goods" :key="index">
          <div class="checkbox">
            <el-checkbox></el-checkbox>
          </div>
          <div class="img-wrap">
            <img :src="item.product.img" style="display:block;max-height: 200px;max-width: 300px;border-radius: 3px;">
          </div>
          <div class="detail">
            <div>{{item.product.name}}</div>
            <div>{{item.product.desc ? item.product.desc : '暂无介绍'}}</div>
            <div class="modify">
              <span>￥ {{item.product.price}}</span>
              <el-input-number size="mini" :min="1" :max="50" v-model="nums"></el-input-number>
            </div>
          </div>
        </li>
      </ul>

      <div class="total">
        合计:<span style="color: #f00;margin-right: 5px;">￥ {{total}}</span>
        <el-button type="danger" size="small" @click="clearCart">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      goods: [],
      product: '',
      nums: 1
    }
  },
  components: {

  },
  methods: {
    getData () {
      this.$axios.get('/cart/user').then(res => {
        this.goods = res.data
        this.product = res.data.product
      })
    },
    clearCart () {
      this.$axios.delete('/cart').then(res => {
        this.$message.success('清空购物车成功')
        this.getData()
      })
    }
  },
  computed: {
    total () {
      return 0
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.top-title {
  margin: 15px 0 0 15px;
  font-size: 18px;
}
.no-goods {
  width: 600px;
  margin-top: 100px;
  text-align: center;
  font-size: 28px;
  color: #666;
}
ul {
  margin-top: 25px;
  color: #666;
}
li {
  display: flex;
  margin-bottom: 15px;
  .checkbox {
    margin: auto 20px;
  }
  .img-wrap {
    width: 300px;
    img {
      margin: 0 auto;
    }
  }
  .detail {
    margin-top: 20px;
    margin-bottom: 50px;
    margin-left: 80px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .modify {
      color: #f00;
      span {
        margin-right: 35px;
      }
    }
  }
}
.total {
  margin-top: 35px;
  margin-left: 50%;
  margin-bottom: 50px;
}
</style>
