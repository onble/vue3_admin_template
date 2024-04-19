// 这里书写属性相关的API文件
import request from '@/utils/request';
import type { CagegoryResponseData, AttrResponseData } from './type';
// 属性管理模块接口地址
enum API {
    // 获取一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    // 获取二级分类接口地址
    C2_URL = 'admin/product/getCategory2/',
    // 获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',
    // 获取分类下已有的属性与属性值
    ATTR_URL = '/admin/product/attrInfoList/',
}
// 获取一级分类的接口方法
export const reqC1 = () => request.get<any, CagegoryResponseData>(API.C1_URL);
// 获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) =>
    request.get<any, CagegoryResponseData>(API.C2_URL + category1Id);
// 获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) =>
    request.get<any, CagegoryResponseData>(API.C3_URL + category2Id);
// 获取对应分类下已有的属性与属性值接口
export const reqAttr = (
    category1Id: string | number,
    category2Id: string | number,
    categorty3Id: string | number,
) =>
    request.get<any, AttrResponseData>(
        API.ATTR_URL + `${category1Id}/${category2Id}/${categorty3Id}`,
    );
