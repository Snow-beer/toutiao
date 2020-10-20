import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import router from './router'
import './style/indes.css'
import { ElementTiptapPlugin } from 'element-tiptap';
// import element-tiptap 样式
import 'element-tiptap/lib/index.css';

// 安装 ElementUI 插件
Vue.use(ElementUI);
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, { /* 插件配置项 */ });
// 现在你已经在全局注册了 `el-tiptap` 组件。

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
