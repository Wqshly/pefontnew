// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import VueCropper from 'vue-cropper'
import VueLazyload from 'vue-lazyload'
import VueParticles from 'vue-particles'

import 'element-ui/lib/theme-chalk/index.css'
import '@/style/font.css'

import api from '@/api/index'
// 展开、折叠过渡动画
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'

import BasicTableTemp from '@/components/tableTemplate/BasicTableTemp'
import MultilevelLinkage from '@/components/areaCheck/MultilevelLinkage'

Vue.use(ElementUI)
Vue.use(VueCropper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('@/assets/img/error.jpg'),
  // loading: require('@/assets/img/loading.gif'),
  attempt: 1, // 加载图片数量
  listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']
})
Vue.use(VueParticles)

Vue.component('basic-table-temp', BasicTableTemp)
Vue.component('ElCollapseTransition', CollapseTransition)
library.add(fas)
library.add(fab)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('multilevel-linkage', MultilevelLinkage)

Vue.prototype.$api = api

Vue.config.productionTip = false

// 使用钩子函数，完成权限控制
router.beforeEach((to, from, next) => {
  var userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (!userInfo && to.path !== '/login' && to.path.split('/')[1] !== 'index') {
    next('/login')
  } else if (to.meta.schoolAdmin) {
    userInfo.identity === '学校管理员' ? next() : next(false) || Vue.prototype.$message.error('您不是管理员，无法进入')
  } else {
    window.scrollTo(0, 0)
    if (to.path !== from.path) {
      next()
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
