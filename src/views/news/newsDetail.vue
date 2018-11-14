<template>
  <div class="news-detail">
    <el-card class="w960">
      <div slot="header">新闻详情</div>
      <h3 class="news-title">{{details.title}}</h3>
      <div class="detail-content" v-html="details.content"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      details:''
    }
  },
  components: {

  },
  methods: {
    getDetails() {
      this.$axios.get(`/journalisms/${this.$route.params.id}`).then(res => {
        if (res.code == 200) {
          // console.log(res)
          this.details = res.data
        }
      })
    }
  },
  created() {
    this.getDetails()
  }
}
</script>

<style scoped>
.news-title {
  text-align: center;
  font-weight: normal;
  font-size: 22px;
  margin: 10px 0;
}
</style>
