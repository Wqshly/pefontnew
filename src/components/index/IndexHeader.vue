<template>
  <div class="header-container">
    <div class="header-box">
      <div class="sidebar-box">
        <img v-lazy="require('../../assets/img/index/largePE.png')" style="height: 30px; float: left;vertical-align: center;margin: 15px 15px 0 0;"/>
        <el-menu class="left-btn" mode="horizontal" text-color="#ffffff" active-text-color="#409EFF" unique-opened router>
          <template v-for="(item,index) in leftHeaderList">
            <el-menu-item :index="item.index" :key="index">
              <span slot="title" class="title-style">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <el-menu class="right-btn" mode="horizontal" text-color="#ffffff" active-text-color="#409EFF" unique-opened router>
          <template v-for="(item,index) in rightHeaderList">
            <el-menu-item :index="item.index" :key="index">
              <span slot="title" class="title-style">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>
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
  }
}
</script>

<style lang="less" scoped>

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

  .sidebar-box{
    max-width: 1440px;
    margin: 0 auto;
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

  @media screen and (min-width: 769px) and (max-width: 1200px){

    .title-style {
      font-size: 16px;
    }
  }

  @media screen and (max-width: 768px){
  }
</style>
