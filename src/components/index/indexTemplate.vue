<template>
    <div class="scroll-style">
      <v-index-header></v-index-header>
      <div class="mobile-style">
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
  @media screen and (max-width: 768px) {
    .mobile-style {
      /*position: relative;*/
      margin-top: 40px;
    }
  }
</style>
