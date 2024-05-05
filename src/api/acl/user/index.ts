// 用户管理模块的接口
import request from '@/utils/request';
import type { User, UserResponseData, AllRoleResponseData } from './type';
// 枚举地址
enum API {
    // 获取全部已有用户账号信息
    ALLUSER_URL = '/admin/acl/user/',
    // 添加一个新的用户账号
    ADDUSER_URL = '/admin/acl/user/save',
    // 更新已有的用户账号
    UPDATEUSER_URL = '/admin/acl/user/update',
    // 获取全部职位。当前账号拥有的职位接口
    ALLROLEURL = '/admin/acl/user/toAssign/',
}
// 获取用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) =>
    request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`);
// 添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
    // 携带参数有ID更新
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data);
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data);
    }
};
// 获取全部职位以及包含当前用户的已有的职位
export const reqALLRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(API.ALLROLEURL + userId);
