<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
  background: #f1f1f1;
  font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", 微软雅黑, Tahoma, Helvetica, STHeiti;
}
.clearfix::after{
  content:'';
  display: block;
  clear: both;
}
.w960{
  width: 960px;
  margin:0 auto;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
ul{
  list-style: none;
}
.el-table {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
</style>
