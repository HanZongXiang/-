<template>
  <span>
    {{timeStr}}
  </span>
</template>

<script>
export default {
  name:'timer',
  props: {
    time: {
      type:[String,Number]
    }
  },
  data() {
    return {
      timeStr:''
    }
  },
  methods: {
    getTime () {
      let time = new Date(this.time)
      const year = time.getFullYear();
      let month = time.getMonth() + 1;
      month = month >= 10 ? '' + month : '0' + month
      let day = time.getDate();
      day = day >= 10 ? '' + day : '0' + day
      let hour = time.getHours();
      hour = hour >= 10 ? '' + hour : '0' + hour
      let minute = time.getMinutes();
      minute = minute >= 10 ? '' + minute : '0' + minute
      let second = time.getSeconds();
      second = second >= 10 ? '' + second : '0' + second
      return this.timeStr = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`
    }
  },
  watch: {
    time() {
      this.getTime()
    }
  },
  mounted() {
    this.getTime()
  }
}
</script>

<style scoped>
</style>