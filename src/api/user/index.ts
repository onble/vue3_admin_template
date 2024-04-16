// 统一管理咱们项目用户相关的接口
import request from '@/utils/request';
// 项目用户相关的请求地址
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: any) =>
    request.post<any.any>(API.LOGIN_URL, data);
// 获取用户信息
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL);
// 退出登录
// 因为路由拦截器会加上Token，所以不需要手动添加Token
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
