<template>
  <div class="">
    users
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      userData: []
    }
  },
  components: {
    
  },
  methods: {
    getData() {
      this.$axios.get('/user').then(res => {
        if (res.code == 200) {
          this.userData = res.data
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
</style>
