<template>
  <div class="header-style">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChange">
      <el-tooltip effect="dark" :content="collapse ? `展开侧边栏` : `折叠侧边栏`" placement="bottom">
        <i :class="[collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </el-tooltip>
    </div>
    <div class="title-style">
      <img class="logo-style" src="../../assets/img/tiyue.png" />
      <span style="margin-left: 10px;">校园PE后台管理系统</span>
    </div>
    <div class="right-menu">
      <div class="header-user-control">
        <!-- 全屏显示按钮 -->
        <div class="fullscreen-btn" style="margin-right: 20px;" @click="fullScreen">
          <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
            <div>
              <font-awesome-icon :icon="['fas', fullscreen ? 'compress' : 'expand']"></font-awesome-icon>
            </div>
          </el-tooltip>
        </div>
        <el-button type="text" @click.native="$router.push('/home')">返回用户页</el-button>
        <el-button type="text" @click.native="logout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/components/manage/bus'

export default {
  name: 'ManageHeader',
  data () {
    return {
      collapse: false,
      fullscreen: false,
      message: 1
    }
  },
  methods: {
    // 侧边栏折叠
    collapseChange () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 全屏事件
    fullScreen () {
      const docElement = document.documentElement
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (docElement.requestFullscreen) {
          docElement.requestFullscreen()
        } else if (docElement.webkitRequestFullScreen) {
          docElement.webkitRequestFullScreen()
        } else if (docElement.mozRequestFullScreen) {
          docElement.mozRequestFullScreen()
        } else if (docElement.msRequestFullscreen) {
          // IE11
          docElement.msRequestFullscreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    // 退出登录
    logout () {
      sessionStorage.removeItem('userInfo')
      this.$api.http.get('/login/logout')
        .catch(err => {
          this.$message.error('您已退出登录！请勿重复操作！')
          console.log(err)
        })
      this.$router.push('/login')
    }
  },
  mounted () {
    if (document.body.clientWidth < 1500) {
      this.collapseChange()
    }
  }
}
</script>

<style scoped lang="less">
  .header-style {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    background: rgba(255, 255, 255, .2);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    width: 40px;
    cursor: pointer;
    line-height: 70px;
  }

  .header-style .title-style {
    float: left;
    display: flex;
    align-items: center;
    line-height: 70px;
  }

  .title-style .logo-style {
    width: 25px;
    vertical-align: middle;
  }

  .header-style .right-menu {
    float: right;
    height: 100%;
    padding-right: 20px;
  }

  .header-style .tips {
    float: left;
    line-height: 70px;
    font-size: 15px;
  }

  .header-style .hide-tips {
    display: none;
  }

  .header-user-control {
    display: flex;
    height: 70px;
    align-items: center;
    vertical-align: text-bottom;
  }

  .message-tips, .fullscreen-btn {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .fullscreen-btn {
    /*transform: rotate(45deg);*/
    margin-right: 5px;
    font-size: 24px;
  }

  .message-tips .el-icon-bell {
    color: #fff;
  }

  .message-tips-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .user-avatar {
    margin-left: 20px;
    cursor: pointer;
  }

  .user-avatar .img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .user-name {
    margin-left: 10px;
  }
</style>
