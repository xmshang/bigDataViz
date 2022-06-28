import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/map/js/china.js'
import VueResource from 'vue-resource'
import '../static/lodash.js'

Vue.prototype.openLoading = function () {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '正在加载...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(6, 13, 31, 1)',       // 背景颜色
    target: document.querySelector('.main-container'),                 // 需要遮罩的区域
    body: false,
    customClass: 'mask'                     // 遮罩层新增类名
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close()                      // 关闭遮罩层
  }, 1000)
  return loading
}
Vue.use(VueResource)
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});