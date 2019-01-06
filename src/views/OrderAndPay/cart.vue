<template>
  <div class="cart-wrap">
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
        <li style="text-align: center;">
          <div style="width: 54px;padding: 15px;border-right: 1px dashed #e1e1e1;">
            勾选
          </div>
          <div style="width: 299px;padding: 15px;border-right: 1px dashed #e1e1e1;">
            商品图
          </div>
          <div style="width: 250px;padding: 15px;">
            商品说明
          </div>
        </li>
        <li v-for="(item, index) in goods" :key="index">
          <div class="checkbox">
            <el-checkbox :checked="item.checked" @change="toggle(item.checked, index)"></el-checkbox>
          </div>
          <div class="img-wrap">
            <img :src="item.product.img" style="display:block;max-height: 200px;max-width: 300px;border-radius: 3px;">
          </div>
          <div class="detail">
            <div>{{item.product.name}}</div>
            <div>{{item.product.desc ? item.product.desc : '暂无介绍'}}</div>
            <div class="modify">
              <span>￥ {{item.product.price}}</span>
              <el-input-number size="mini" :min="1" :max="50" v-model="item.productNum"></el-input-number>
            </div>
            <div>
              单件总价： <el-tag type="danger">{{item.product.price * item.productNum}}</el-tag>
            </div>
          </div>
        </li>
      </ul>

      <div class="total">
        合计:<span style="color: #f00;margin-right: 5px;"> ￥ {{total}}</span>
        <el-button type="danger" size="small" @click="cartSettlement">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      goods: []
    }
  },
  components: {

  },
  methods: {
    getData () {
      this.$axios.get('/cart/user').then(res => {
        this.goods = res.data
      })
    },
    cartSettlement () {
      var ids = []
      this.goods.forEach((item, index) => {
        if (item.checked) {
          ids.push(item._id)
        }
      })
      console.log(ids)
      this.$axios.post('/cartSettlement',{ids}).then(res => {
        if (res.code === 200) {
          this.$message.success('购物车结算成功')
          this.getData()
        } else {
          this.$message.info(res.msg)
        }
      })
    },
    toggle (status, index) {
      if (this.goods[index].checked) {
        this.goods[index].checked = false
      } else {
        this.goods[index].checked = true
      }
    }
  },
  computed: {
    total () {
      var sum = 0
      this.goods.forEach((item, index) => {
        if (item.checked) {
          sum += item.product.price * item.productNum
        }
      })
      return sum
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.cart-wrap {
  width: 700px;
  margin: 0 auto;
}
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
  border: 1px solid #e1e1e1;
  border-radius: 2px;
  .checkbox {
    margin: auto 20px;
    padding: 15px;
  }
  .img-wrap {
    padding: 15px;
    width: 300px;
    border-left: 1px dashed #e1e1e1;
    border-right: 1px dashed #e1e1e1;
    img {
      margin: 0 auto;
    }
  }
  .detail {
    padding: 15px;
    padding-left: 0;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .modify {
      color: #f00;
      span {
        margin-right: 3px;
      }
    }
  }
}
.total {
  margin-top: 35px;
  margin-left: 75%;
  margin-bottom: 50px;
}
</style>
