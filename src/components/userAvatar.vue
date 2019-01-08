<template>
  <img :src="avatar" style="width: 32px;height: 32px;border-radius: 50%;">
</template>

<script>
import axios from 'axios'
export default {
  name:'timer',
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      avatar: ''
    }
  },
  methods: {
    getUserInfo () {
      let id = this._props.id
      this.$axios.get(`/user/${id}`).then(res => {
        this.avatar = res.data.avatar
      })
    }
  },
  watch: {
    id () {
      this.getUserInfo()
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
</style>