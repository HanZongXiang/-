<template>
  <span>
    {{username}}
  </span>
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
      username: ''
    }
  },
  methods: {
    getUserInfo () {
      let id = this._props.id
      this.$axios.get(`/user/${id}`).then(res => {
        this.username = res.data.username
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