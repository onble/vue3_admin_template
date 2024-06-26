// 服务器全部接口返回的数据类型
export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}
// SPU数据的ts类型
export interface SpuDate {
    id?: number;
    spuName: string;
    description: string;
    category3Id: string | number;
    tmId: number | string;
    spuSaleAttrList: null | SpuImg[];
    spuImageList: null | SpuImg[];
}
// 数组：元素都是SPU数据类型
export type Records = SpuDate[];
// 定义获取已有的SPU接口返回的数据ts类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records;
        total: number;
        size: number;
        current: number;
        searchCount: boolean;
        pages: number;
    };
}

// 品牌数据的TS类型
export interface Trademark {
    id: number;
    tmName: string;
    logoUrl: string;
}
// 品牌接口返回的数据ts类型
export interface AllTrademark extends ResponseData {
    data: Trademark[];
}

// 商品图片的ts类型
export interface SpuImg {
    id?: number;
    createTime?: string;
    updateTime?: string;
    spuId?: number;
    imgName?: string;
    imgUrl?: string;
    name?: string;
    url?: string;
}
// 已有的SPU的照片墙数据的类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[];
}

// 已有的销售属性值对象ts类型
export interface SaleAttrValue {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number | string;
    saleAttrValueName: string;
    saleAttrName?: string;
    isChecked?: null;
}
// 存储已有的销售属性值数组类型
export type SpuSaleAttrValueList = SaleAttrValue[];
// 销售属性对象ts类型
export interface SaleAttr {
    id?: number;
    createTime?: null;
    updateTime?: null;
    spuId?: number;
    baseSaleAttrId: number | string;
    saleAttrName: string;
    spuSaleAttrValueList: SpuSaleAttrValueList;
    flag?: boolean;
    saleAttrValue?: string;
}
// SPU已有的销售属性接口返回数据ts类型
export interface SaleAttrReaponseData extends ResponseData {
    data: SaleAttr[];
}

// 已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
    id: number;
    name: string;
}
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[];
}
export interface Attr {
    id?: number;
    attrId: number | string; // 平台属性的ID
    valueId: number | string; // 属性值的ID
}
export interface saleArr {
    id?: number;
    alseAttrId: number | string; // 属性ID
    alseAttrValueId: number | string; // 属性值的ID
}

export interface SkuData {
    category3Id?: string | number; // 三级分类的ID
    spuId?: string | number; // 已有的SPU的ID
    tmId?: string | number; // SPU品牌的ID
    skuName?: string; // sku名字
    price?: string | number; // sku价格
    weight?: string | number; // sku重量
    skuDesc?: string; // sku的描述
    skuAttrValueList?: Attr[]; // 平台属性的收集
    skuSaleAttrValueList?: saleArr[]; // 销售属性
    skuDefaultImg?: string; // sku图片地址
    isSale?: number; // 控制商品的上架与下架
    id?: number;
}
// 获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[];
}
// 获取SKU商品详情接口的ts类型
export interface SkuInfoData extends ResponseData {
    data: SkuData;
}
