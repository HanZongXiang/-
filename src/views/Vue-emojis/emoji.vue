<template>
  <div>
    <VueEmoji @input="onInput" />
  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'
export default {
  data () {
    return {
      myText: ''
    }
  },
  components: {
    VueEmoji
  },
  methods: {
    onInput (event) {
      console.log(event, this.myText)
      this.myText = event.data
    }
  }
}
</script>

<style scoped>

</style>