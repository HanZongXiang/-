<template>
  <div class="message-board">
    <h2 class="title">用户留言板<i>Message Board</i></h2>
    <div class="board-content">
      <h3>用户留言信息</h3>
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
.message-board{
  margin-top: 10px;
  padding-left:10px;
  border-left:1px dashed #e1e1e1;
  height: 450px;
}
.title{
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
.board-content{
  h3{
    font-size: 16px;
    font-weight: normal;
    color:#666;
    border-left:3px solid #555;
    padding-left: 5px;
  }
}
</style>
