<template>
  <div class="page-container">
    <div id="web-menu">
      <div class="header-item-container">
        <el-menu mode="horizontal" router>
          <template v-for="(FirstLevelItem,index) in headerList">
            <!-- 有子目录的 -->
            <template v-if="FirstLevelItem.subs">
              <el-submenu :index="FirstLevelItem.index" :key="index" :class="[{'float-right' : FirstLevelItem.float !== 'left' && FirstLevelItem.float !== 'img'}]">
                <template slot="title">
                  <i :class="FirstLevelItem.icon"></i>
                  <span slot="title">{{FirstLevelItem.title}}</span>
                </template>
                <!-- 二级菜单 -->
                <template v-for="(subItem,index) in FirstLevelItem.subs">
                  <template v-if="subItem.subs">
                    <el-submenu :index="subItem.index" :key="index">
                      <template slot="title">
                        <i :class="subItem.icon"></i>
                        <span slot="title">{{subItem.title}}</span>
                      </template>
                      <template v-for="(ThreeLevelItem,index) in subItem.subs">
                        <el-menu-item :index="ThreeLevelItem.index" :key="index">
                          <span>{{ThreeLevelItem.title}}</span>
                        </el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="subItem.index" :key="subItem.index">
                      <span>{{subItem.title}}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
            <!-- 无子目录的 -->
            <template v-else>
              <el-menu-item :index="FirstLevelItem.index" :key="index" :class="[{'float-right' : FirstLevelItem.float !== 'left' && FirstLevelItem.float !== 'img'}]">
                <i :class="FirstLevelItem.icon"></i>
                <template v-if="FirstLevelItem.imgPath">
                  <img style="height: 30px;" src="@/assets/img/largePE.png" />
                </template>
                <span slot="title">{{FirstLevelItem.title}}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </div>
    </div>
    <div id="app-menu">
      <div class="header-item-container">
        <el-menu mode="horizontal" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-fold"></i>目录</template>
            <template v-for="(FirstLevelItem,index) in headerList">
              <!-- 有子目录的 -->
              <template v-if="FirstLevelItem.subs">
                <el-submenu v-if="FirstLevelItem.float !== 'account' && FirstLevelItem.float !== 'img'" :index="FirstLevelItem.index" :key="index">
                  <template slot="title">
                    <i :class="FirstLevelItem.icon"></i>
                    <span slot="title">{{FirstLevelItem.title}}</span>
                  </template>
                  <!-- 二级菜单 -->
                  <template v-for="(subItem,index) in FirstLevelItem.subs">
                    <template v-if="subItem.subs">
                      <el-submenu :index="subItem.index" :key="index">
                        <template slot="title">
                          <i :class="subItem.icon"></i>
                          <span slot="title">{{subItem.title}}</span>
                        </template>
                        <template v-for="(ThreeLevelItem,index) in subItem.subs">
                          <el-menu-item :index="ThreeLevelItem.index" :key="index">
                            <span>{{ThreeLevelItem.title}}</span>
                          </el-menu-item>
                        </template>
                      </el-submenu>
                    </template>
                    <template v-else>
                      <el-menu-item :index="subItem.index" :key="subItem.index">
                        <span>{{subItem.title}}</span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <!-- 无子目录的 -->
              <template v-else>
                <el-menu-item v-if="FirstLevelItem.float !== 'account' && FirstLevelItem.float !== 'img'" :index="FirstLevelItem.index" :key="index">
                  <i :class="FirstLevelItem.icon"></i>
                  <span slot="title">{{FirstLevelItem.title}}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
          <template v-for="(FirstLevelItem,index) in headerList">
            <!-- 有子目录的 -->
            <template v-if="FirstLevelItem.subs">
              <el-submenu v-if="FirstLevelItem.float === 'account'" :index="FirstLevelItem.index" :key="index" :class="[{'float-right' : FirstLevelItem.float ==='account'}]">
                <template slot="title">
                  <i :class="FirstLevelItem.icon"></i>
                  <span slot="title">{{FirstLevelItem.title}}</span>
                </template>
                <!-- 二级菜单 -->
                <template v-for="(subItem,index) in FirstLevelItem.subs">
                  <template v-if="subItem.subs">
                    <el-submenu :index="subItem.index" :key="index">
                      <template slot="title">
                        <i :class="subItem.icon"></i>
                        <span slot="title">{{subItem.title}}</span>
                      </template>
                      <template v-for="(ThreeLevelItem,index) in subItem.subs">
                        <el-menu-item :index="ThreeLevelItem.index" :key="index">
                          <span>{{ThreeLevelItem.title}}</span>
                        </el-menu-item>
                      </template>
                    </el-submenu>
                  </template>
                  <template v-else>
                    <el-menu-item :index="subItem.index" :key="subItem.index">
                      <span>{{subItem.title}}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data () {
    return {
      isActive: 'activity',
      headerList: [
        {
          imgPath: true,
          index: '/',
          float: 'img'
        },
        {
          title: '首页',
          index: '/home',
          float: 'left'
        },
        {
          title: '早操',
          index: '/clockIn',
          float: 'left',
          subs: [
            {
              title: '设置签到员',
              index: '/morningExercises/setCheckStaff'
            },
            {
              title: '早操签到',
              index: '/morningExercises/clockIn'
            }
          ]
        },
        {
          title: '比赛',
          index: '/competition',
          float: 'left',
          subs: [
            {
              title: '本地比赛',
              index: '/competition/localCompetition'
            },
            {
              title: '区域联赛',
              index: '/competition/regionalLeague'
            },
            {
              title: '我的比赛',
              index: '/competition/myCompetition'
            }
          ]
        },
        {
          title: '活动',
          index: '/activity',
          float: 'left',
          subs: [
            {
              title: '发起活动',
              index: '/activity/activityPromotional'
            },
            {
              title: '活动报名',
              index: '/activity/registration'
            },
            {
              title: '我发起的',
              index: '/activity/myActivity'
            },
            {
              title: '组织签到',
              index: '/activity/check'
            }
          ]
        },
        {
          title: '账户',
          icon: 'el-icon-s-custom',
          index: '/account',
          float: 'account',
          subs: [
            {
              title: '管理员入口',
              index: '/manage/home'
            },
            {
              title: '注销',
              index: '/logout'
            }
          ]
        },
        {
          title: '健康管理',
          index: '/health',
          float: 'right',
          subs: [
            {
              title: '个人信息',
              index: '/health/home'
            },
            {
              title: '祛痘',
              index: '/health/anti'
            },
            {
              title: '形体矫正',
              index: '/health/404'
            }
          ]
        },
        {
          title: '场地与器材',
          index: '/404',
          float: 'right',
          subs: [
            {
              title: '场地预约',
              index: '/health/home/1'
            },
            {
              title: '器材租赁',
              index: '/health/1111'
            },
            {
              title: '运动装备',
              index: '/health/123456'
            }
          ]
        },
        {
          title: '裁判园地',
          index: '/theory',
          float: 'right',
          subs: [
            {
              title: '裁判学习',
              index: '/theory/home'
            },
            {
              title: '在线考试',
              index: '/theory/exam'
            }
          ]
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$api.http.get('/api/login/logout').then(res => {
      })
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .page-container {
    height: 60px;
    width: 100%;
  }

  #web-menu {
    width: 100%;
    position: fixed;
    z-index: 999;
    background-color: white;
    display: block !important;
  }

  #app-menu {
    display: block;
  }

  .header-item-container {
    height: 60px;
    line-height: 60px;
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    vertical-align: middle;
  }

  .float-right {
    float: right !important;
  }

  /*手机端*/
  @media screen and (max-width: 1020px) {
    .page-container {
      height: 60px;
      width: 100%;
    }

    #web-menu {
      display: none !important;
    }

    #app-menu {
      width: 100%;
      position: fixed;
      z-index: 999;
      display: block !important;
    }

    .header-item-container {
      height: 60px;
      width: 100%;
      margin: 0 auto;
      top: 0;
      z-index: 999;
      overflow: hidden;
      background-color: #1B1C20;
      align-items: center;
    }
  }

</style>
