<template>
  <div class="wrapper">
    <div class="st">
      <img src="/static/imgs/404_03.png">
    </div>
    <div class="fh">
      <a href="/">
        <img src="/static/imgs/404_06.png">
      </a>
    </div>
    <div class="fh">
      <b id="num">{{secs}}</b>秒后跳转到首页
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        secs: 5
      }
    },
    components: {

    },
    methods: {
      countDown() {
        if (--this.secs > 0) {
          setTimeout(() => {
            this.countDown()
          }, 1000);
        } else {
          this.$router.push('/')
        }
      }
    },
    created() {
      this.countDown()
    }
  }
</script>

<style scoped>
/* html {
  width: 100%;
  overFlow-x: hidden;
  OVERFLOW: scroll;
}

body {
  margin: 0px;
  padding: 0px;
  background: #fff;
} */

ul {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.cl {
  clear: both;
}

* {
  font-family: "寰蒋闆呴粦";
  font-size: 12px;
  color: #5f5f5f;
}

a {
  font-family: "寰蒋闆呴粦";
  font-size: 12px;
  color: #5f5f5f;
  text-decoration: none;
}

a:hover {
  color: #f00;
  border: 0px;
}

img {
  border: 0px;
}

.st {
  width: 728px;
  height: 320px;
  text-align: center;
  margin: 0 auto;
  margin-top: 70px;
}

.fh {
  width: 728px;
  height: 89px;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;
}
</style>