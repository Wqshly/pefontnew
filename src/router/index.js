import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 门户页
const indexTemplate = () => Promise.resolve(require('@/components/index/indexTemplate'))
const index = () => Promise.resolve(require('@/view/index/home'))

// 登录
const login = () => Promise.resolve(require('@/view/login'))
const logout = () => Promise.resolve(require('@/view/account/logout'))

// 用户页
const userTemplate = () => Promise.resolve(require('@/components/user/userTemplate'))
const home = () => Promise.resolve(require('@/view/home'))
// 早操
const clockIn = () => Promise.resolve(require('@/view/morningExercises/clockIn'))
const setCheckStaff = () => Promise.resolve(require('@/view/morningExercises/setCheckStaff'))
// 比赛
// const
// 活动
const activityPromotional = () => Promise.resolve(require('@/view/activity/promotional'))
const activityRegistration = () => Promise.resolve(require('@/view/activity/registration'))
const myActivity = () => Promise.resolve(require('@/view/activity/myActivity'))

// 管理员页
const manageTemplate = () => Promise.resolve(require('@/components/manage/manageTemplate'))
const manageHome = () => Promise.resolve(require('@/view/manage/home'))
// 学校管理
const collegeManage = () => Promise.resolve(require('@/view/manage/school/collegeManage'))
const classManage = () => Promise.resolve(require('@/view/manage/school/classManage'))
const studentManage = () => Promise.resolve(require('@/view/manage/school/studentManage'))
// 活动管理
const activityApproval = () => Promise.resolve(require('@/view/manage/activity/activityApproval'))
const cardTest = () => Promise.resolve(require('@/view/manage/activity/cardTest'))

// 多次点击同一路由时，执行catch，避免报错。
const routerPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: indexTemplate,
      children: [
        {
          path: '/index',
          component: index
        }
      ]
    },
    {
      path: '/',
      component: userTemplate,
      children: [
        {
          path: '/home',
          component: home
        },
        // 早操
        {
          path: '/morningExercises/clockIn',
          component: clockIn
        },
        {
          path: '/morningExercises/setCheckStaff',
          component: setCheckStaff
        },
        // 活动
        {
          path: '/activity/activityPromotional',
          component: activityPromotional
        },
        {
          path: '/activity/registration',
          component: activityRegistration
        },
        {
          path: '/activity/myActivity',
          component: myActivity
        }
      ]
    },
    {
      path: '/',
      component: manageTemplate,
      meta: {
        schoolAdmin: true
      },
      children: [
        {
          path: '/manage/home',
          component: manageHome,
          meta: {
            title: '首页',
            schoolAdmin: true
          }
        },
        {
          path: '/manage/collegeManage',
          component: collegeManage,
          meta: {
            title: '院系信息管理',
            schoolAdmin: true
          }
        },
        {
          path: '/manage/classManage',
          component: classManage,
          meta: {
            title: '班级信息管理',
            schoolAdmin: true
          }
        },
        {
          path: '/manage/studentManage',
          component: studentManage,
          meta: {
            title: '学生管理',
            schoolAdmin: true
          }
        },
        {
          path: '/manage/activityApproval',
          component: activityApproval,
          meta: {
            title: '活动审批',
            schoolAdmin: true
          }
        },
        {
          path: '/manage/cardTest',
          component: cardTest,
          meta: {
            title: '活动审批',
            schoolAdmin: true
          }
        }
      ]
    },
    {
      path: '/logout',
      component: logout
    }
  ]
})
