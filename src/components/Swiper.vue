<template>
  <div class="carousel">
    <el-carousel indicator-position="outside">
      <el-carousel-item>
        <img src="/static/imgs/swiper1.jpg">
      </el-carousel-item>
      <el-carousel-item>
        <img src="/static/imgs/swiper2.jpg">
      </el-carousel-item>
      <el-carousel-item>
        <img src="/static/imgs/swiper3.jpg">
      </el-carousel-item>
      <el-carousel-item>
        <img src="/static/imgs/swiper4.jpg">
      </el-carousel-item>
    </el-carousel>
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

<style scoped>
img{
  width: 550px;
  height: 350px;
  border-radius: 4px;
}
.carousel{
  border:1px solid rgb(179, 172, 172);
  box-sizing: border-box;
  padding:5px;
  border-radius: 4px;
  margin-top: 10px;
  width: 560px;
}
</style>
