import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置element-plus国际化 下面的注释帮助ts进行忽略报错
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus,{
    locale:zhCn// elemet-plus国际化配置
});
// console.log(import.meta.env)
// svg插件需要配置代码
import 'virtual:svg-icons-register'

// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon',SvgIcon);

// 引入自定义插件对象：注册整个项目全局组件
import gloalComponent from '@/components';
// console.log(gloalComponent)
// 安装自定义插件
app.use(gloalComponent)
// 将应用挂在到挂载点上
app.mount('#app')
