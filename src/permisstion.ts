// 路由鉴权：鉴权，项目当中路由能不能访问的权限设置
import router from '@/router';
import setting from './setting';
import nprogress from 'nprogress';
// 引入进度条样式
import 'nprogress/nprogress.css';
// 不显示加载的小球
nprogress.configure({ showSpinner: false });
import useUserStore from './store/modules/user';
import pinia from './store';
const userStore = useUserStore(pinia);
// 全局守卫:项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title.slice(0, 4)} - ${to.meta.title}`;
    // to:你将要访问哪个路由
    // from:你从哪个路由而来
    // next:路由的放行函数
    nprogress.start();
    // 获取token，去判断用户登录，还是未登录
    const token = userStore.token;
    // 获取用户名字
    const username = userStore.username;
    // 用户登录判断
    if (token) {
        // 登录成功，访问login,不能访问，指向首页
        if (to.path == '/login') {
            next({ path: '/' });
        } else {
            // 登录成功访问其余六个路由（登录排除）
            // 有用户信息
            if (username) {
                // 放行
                next();
            } else {
                // 如果没有用户信息。在守卫这里发请求获取到了用户信息再放行
                try {
                    // 获取用户信息
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    // token过期：获取不到用户信息了
                    // 用户手动修改本地存储token
                    // 退出登录->用户相关的数据清空
                    userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } });
                }
            }
        }
    } else {
        // 用户未登录判断
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }
});
// 全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done();
});
