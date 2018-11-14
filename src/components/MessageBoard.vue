<template>
  <div class="message-board">
    <h2 class="board-title">用户留言板<i>Message Board</i></h2>
    <ul class="board-content clearfix">
      <li v-for="(item,index) in data">
        @<span>{{item.author.username}}  :</span> {{item.content}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      data: []
    }
  },
  components: {

  },
  methods: {
    getMessage() {
      this.$axios.get('/message',{size: 5}).then(res => {
        this.data = res.data
      })
    }
  },
  created() {
    this.getMessage()
  }
}
</script>

<style scoped lang="scss">
.message-board{
  margin-top: 10px;
  padding-left:10px;
  border-left:1px dashed #e1e1e1;
  height: 305px;
  width: 384px;
}
.board-title{
  height: 40px;
  line-height: 42px;
  font-size: 20px;
  font-weight: bold;
  color: #237BAF;
  border-bottom: 1px solid #fff;

  i{
    font-style: normal;
    padding-left: 4px;
    font-size: 14px;
    font-weight: 500;
    color:#999;
  }
  
}
.board-content{
  box-sizing: border-box;
  li {
    font-size: 12px;
    color: #555;
    padding: 10px 0;
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dashed #e1e1e1;
  }
  // li:nth-child(2n) {
  //   float: left;
  // }
  // li:nth-child(2n-1) {
  //   float: left;
  // }
}
</style>
