<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#304156" text-color="#ffffff" active-text-color="#1890ff" unique-opened router>
      <template v-for="item in items">
        <!--        有子目录的-->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <font-awesome-icon :icon="['fas', item.icon]"></font-awesome-icon>
              <span slot="title">{{item.title}}</span>
            </template>
            <!--            子目录下拉内容-->
            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                <span>{{subItem.title}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!--        无子目录的-->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <font-awesome-icon :icon="['fas', item.icon]"></font-awesome-icon>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '@/components/manage/bus'

export default {
  name: 'sidebar',
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'home',
          index: '/manage/home',
          title: '首页'
        },
        {
          icon: 'university',
          index: '/manage/school',
          title: '学校管理',
          subs: [
            {
              index: '/manage/collegeManage',
              title: '院系信息管理'
            },
            {
              index: '/manage/classManage',
              title: '班级信息管理'
            },
            {
              index: '/manage/studentManage',
              title: '学生信息管理'
            }
          ]
        },
        {
          icon: 'location-arrow',
          index: '/manage/activity',
          title: '活动管理',
          subs: [
            {
              title: '审批活动',
              index: '/manage/activityApproval'
            },
            {
              title: 'card测试',
              index: '/manage/cardTest'
            }
          ]
        },
        {
          icon: 'user',
          index: '/test',
          title: '测试'
        },
        {
          icon: 'user',
          index: 'app-manage',
          title: '移动端管理',
          subs: [
            {
              index: 'menu-manage',
              title: '业务分类管理'
            },
            {
              index: 'pic-manage',
              title: '图片推送管理'
            },
            {
              index: 'article-manage',
              title: '文章推送管理'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  // 通过 Event Bus 进行组件间通信，来折叠侧边栏
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style>

  .el-menu--popup {
    background: rgba(255, 255, 255, 0.7);
  }

  .el-menu .el-submenu__title:hover {
    font-weight: 700;
    -webkit-transition: all .5s;
  }

  .el-submenu .el-menu {
    top: 0; bottom: 0;
    left: 0; right: 0;
    margin: auto;
    background: rgba(255, 255, 255, .1);
  }

  .el-menu-item:hover {
    font-weight: 700;
    -webkit-transition: all .5s;
  }
</style>

<style scoped lang="less">

  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .sidebar::-webkit-scrollbar {
  }

  .sidebar-el-menu {
  }

  /*未折叠时侧边栏的宽度*/
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
