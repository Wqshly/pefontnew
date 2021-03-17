<template>
    <div style="height: 100%;">
      <v-header></v-header>
      <div class="main-style">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import VHeader from '@/components/user/Header'
export default {
  name: 'userTemplate',
  components: {
    VHeader
  }
}
</script>

<style scoped lang="less">

  .main-style {
    width: auto;
    padding-top: 5px;
    overflow: hidden;
  }

</style>
