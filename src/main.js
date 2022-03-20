/*
 * @author: Lan_
 * @create: 2021-06-26 13:52 PM
 * @license: MIT
 * @lastAuthor: Lan_
 * @lastEditTime: 2021-07-01 09:12 AM
 * @desc:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
// import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios,axios);
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@/assets/layout.css'
import API from '@/api'
import dayjs from 'dayjs'
import UTIL from '@/util'

var relativeTime = require('dayjs/plugin/relativeTime')
var updateLocale = require('dayjs/plugin/updateLocale')
require('dayjs/locale/zh-cn')

dayjs.extend(updateLocale)
dayjs.locale('zh-cn') // 全局使用简体中文

dayjs.extend(relativeTime)

router.beforeEach(function (to, from, next) {
  if (!to.meta.isLogin) {
    next();
    return;
  }

  //页面是否登录
  if (localStorage.getItem(process.env.NODE_ENV + "_token")) {
    //本地存储中是否有token(uid)数据
    next(); //表示已经登录
  } else {
    //next可以传递一个路由对象作为参数 表示需要跳转到的页面
    // next("/daily/login");
    next({ path: '/login', query: { Rurl: to.fullPath } });
  }
});

Vue.use(VueQuillEditor)
Vue.prototype.$api = API;
Vue.prototype.$util = UTIL;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: { App },
  template: '<App/>',
  data: {
    music: '10085'
  }
})
// console.log(music);
// console.log(111);


