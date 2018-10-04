<template>
  <div class="layout">
    <HeaderNav></HeaderNav>
    <router-view></router-view>
    
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'


export default {
  name:'',
  data() {
    return {

    }
  },
  components: {
    HeaderNav
    
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
