import type { TradeMark, TradeMarkResponseData } from './type';
// 书写品牌管理模块接口
import request from '@/utils/request';
// 品牌管理模块接口地址
enum API {
    // 获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/',
    // 添加品牌
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATETRADEMARK = '/admin/product/baseTrademark/update',
}
// 获取已有品牌的接口方法
// page:获取第几页 ---默认第一页
// limit:获取几个已有品牌的数据
export const reqHasTardemark = (page: number, limmit: number) =>
    request.get<any, TradeMarkResponseData>(
        API.TRADEMARK_URL + `${page}/${limmit}`,
    );

// 添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
    if (data.id) {
        // 修改已有品牌的数据
        return request.put<any, any>(API.UPDATETRADEMARK);
    } else {
        // 新增品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL);
    }
};
