import { createApp } from 'vue';
import App from './App.vue';
// 引入element-plus插件与样式
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 配置element-plus国际化 下面的注释帮助ts进行忽略报错
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// 引入模板的全局的样式
import '@/styles/index.scss';
// svg插件需要配置代码
import 'virtual:svg-icons-register';
// 引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components';
// 引入路由
import router from './router';
// 引入仓库
import pinia from './store';
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css';

// 获取应用实例对象
const app = createApp(App);

// 安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn, // elemet-plus国际化配置
});
// 安装自定义插件
app.use(gloalComponent);
// 安装仓库
app.use(pinia);
// 注册模板路由
app.use(router);
// 引入路由鉴权文件
import './permisstion';
// 将应用挂在到挂载点上
app.mount('#app');
