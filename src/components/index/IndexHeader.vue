<template>
  <div class="header-container">
    <div class="header-box">
      <div class="sidebar-box">
        <div class="sidebar-container">
          <img class="header-logo" v-lazy="require('../../assets/img/index/largePE.png')" @click="logoImgClick()"/>
          <el-menu class="left-btn pc-menu" mode="horizontal" text-color="#ffffff" active-text-color="#409EFF"
                   unique-opened router>
            <template v-for="(item,index) in leftHeaderList">
              <el-menu-item :index="item.index" :key="index">
                <span slot="title" class="title-style">{{item.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
          <el-menu class="right-btn" mode="horizontal" text-color="#ffffff" active-text-color="#409EFF" unique-opened
                   router>
            <template v-for="(item,index) in rightHeaderList">
              <el-menu-item :index="item.index" :key="index">
                <span slot="title" class="title-style">{{item.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <el-collapse-transition>
          <div v-show="isCollapse">
            <el-table :data="leftHeaderList"
                      :show-header="false"
                      class="table-style"
                      :cell-style="tableRowStyle"
                      @cell-click="cellClick">
              <el-table-column prop="index">
                <template slot-scope="scope">
                  {{scope.row.title}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexHeader',
  data () {
    return {
      leftHeaderList: [
        {
          index: '/index',
          title: '首页'
        },
        {
          index: '/index/venue',
          title: '场馆预约'
        },
        {
          index: '/index/404',
          title: '移动端下载'
        },
        {
          index: '/home',
          title: '新闻资讯'
        }
      ],
      rightHeaderList: [
        {
          index: '/index',
          title: '使用帮助'
        },
        {
          index: '/home',
          title: '登录'
        }
      ],
      isCollapse: false
    }
  },
  methods: {
    logoImgClick () {
      if (window.innerWidth > 768) {
        this.$router.push('/index')
      } else {
        this.isCollapse = !this.isCollapse
      }
    },
    tableRowStyle ({row, rowIndex}) {
      return {
        'font-size': '12px',
        'padding': '8px 0',
        'cursor': 'pointer'
      }
    },
    cellClick (val) {
      this.isCollapse = false
      if (val.index !== this.$router.path) {
        this.$router.push(val.index)
      }
    }
  }
}
</script>

<style lang="less" scoped>

  .pc-menu {
    display: block;
  }

  .mobile-menu {
    display: none;
  }

  .header-container {
    margin-bottom: 60px;
  }

  .header-box {
    display: inherit;
    position: absolute;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #3E3A39;
    z-index: 999;

    .left-btn {
      margin-right: 15px;
      vertical-align: middle;
      float: left;
      line-height: 60px;
      cursor: pointer;
    }

    .right-btn {
      margin-right: 15px;
      vertical-align: middle;
      float: right;
      line-height: 60px;
      cursor: pointer;
    }
  }

  .sidebar-box {
    max-width: 1440px;
    margin: 0 auto;
  }

  .sidebar-container {
    height: 60px;
  }

  .header-logo {
    height: 30px;
    float: left;
    vertical-align: center;
    margin: 15px 15px 0 0;
    cursor: pointer;
  }

  .el-menu {
    background: transparent none !important;
    border-bottom: none !important;
  }

  .el-menu-item {
    background: transparent none !important;
    border-bottom: none !important;
  }

  .el-menu-item:hover {
    color: #409EFF !important;
  }

  .title-style {
    font-size: 20px;
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    .title-style {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 768px) {

    .header-container {
      margin-bottom: 40px;
    }

    .header-box {
      display: inherit;
      height: 40px;

      .left-btn, .right-btn {
        margin-right: 5px;
        line-height: 40px;
      }
    }

    .sidebar-container {
      height: 40px;
    }

    .header-logo {
      height: 15px;
      float: left;
      vertical-align: center;
      margin: 12px 15px 0 5px;
    }

    .el-menu-item {
      padding: 0 10px;
      height: 40px !important;
      line-height: 40px !important;
    }

    .title-style {
      font-size: 14px;
    }

    .table-style {
      width: 100%;
      font-size: 12px;
    }

    .pc-menu {
      display: none;
    }
  }
</style>
