<template>
    <div class="scroll-style">
      <v-index-header></v-index-header>
      <div>
        <router-view></router-view>
      </div>
      <v-index-footer></v-index-footer>
    </div>
</template>

<script>
import VIndexHeader from '@/components/index/IndexHeader'
import VIndexFooter from '@/components/index/IndexFooter'

export default {
  name: 'indexTemplate',
  components: {
    VIndexHeader,
    VIndexFooter
  }
}
</script>

<style scoped>
</style>
