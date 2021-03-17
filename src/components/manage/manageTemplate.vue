<template>
  <div class="fill-container">
    <v-sidebar></v-sidebar>
    <div class="main-container" :class="{'main-container-collapse':collapse}">
      <manage-header style="z-index: 999"></manage-header>
      <v-tags></v-tags>
      <div class="content scroll-style">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import ManageHeader from '@/components/manage/ManageHeader'
import VSidebar from '@/components/manage/sidebar'
import VTags from '@/components/manage/tags'
import bus from '@/components/manage/bus'
export default {
  name: 'manageTemplate',
  components: {
    ManageHeader,
    VSidebar,
    VTags
  },
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

<style lang="less" scoped>

  .main-container {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom: 0;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
  }

  .main-container-collapse {
    left: 65px;
  }

  .content {
    top: 115px;
    position: absolute;
    width: 100%;
    height: calc(100% - 115px);
    /*overflow-y: hidden;*/
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f0f2f5;
  }

  .content-tags {
    padding: 0 10px;
  }
</style>
