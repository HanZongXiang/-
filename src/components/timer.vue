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
      const month = time.getMonth() + 1;
      const day = time.getDate();
      const hour = time.getHours();
      const minute = time.getMinutes();
      const second = time.getSeconds();
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